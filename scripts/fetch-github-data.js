#!/usr/bin/env node
/**
 * Fetches GitHub language stats for all trackable skills and writes
 * the result to src/frontend/public/data/github-stats.json.
 *
 * Requires GITHUB_TOKEN environment variable with repo + read:user scopes.
 * Optionally reads GITHUB_USERNAME (defaults to "JoeyRubas").
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const USERNAME = process.env.GITHUB_USERNAME || 'JoeyRubas';
const TOKEN = process.env.GITHUB_TOKEN;
const MAX_LINES_PER_COMMIT = 5000;

// Skills that are trackable in GitHub - maps skill name to optional GitHub alias
const TRACKABLE_SKILLS = {
  Python: null,
  HTML: null,
  CSS: null,
  JavaScript: null,
  TypeScript: null,
  Vue: null,
  'C#': null,
  Java: null,
};

// ---------------------------------------------------------------------------
// HTTP helpers
// ---------------------------------------------------------------------------

function request(url, options = {}) {
  return new Promise((resolve, reject) => {
    const headers = {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'JoeyResume/1.0',
      ...(TOKEN ? { Authorization: `token ${TOKEN}` } : {}),
      ...options.headers,
    };

    const urlObj = new URL(url);
    const reqOptions = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers,
    };

    const req = https.request(reqOptions, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(body));
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${body.slice(0, 200)}`));
        }
      });
    });

    req.on('error', reject);
    if (options.body) req.write(options.body);
    req.end();
  });
}

function graphql(query, variables) {
  return request('https://api.github.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// ---------------------------------------------------------------------------
// GitHub API calls
// ---------------------------------------------------------------------------

async function getAllUserRepos() {
  const repos = [];
  let page = 1;
  while (true) {
    const batch = await request(
      `https://api.github.com/users/${USERNAME}/repos?per_page=100&type=all&sort=created&direction=asc&page=${page}`
    );
    if (!batch.length) break;
    repos.push(...batch);
    if (batch.length < 100) break;
    page++;
    await sleep(50);
  }
  // dedupe by full_name
  const seen = new Set();
  return repos.filter((r) => {
    if (seen.has(r.full_name)) return false;
    seen.add(r.full_name);
    return true;
  });
}

async function getRepoLanguages(fullName) {
  try {
    const data = await request(
      `https://api.github.com/repos/${fullName}/languages`
    );
    const total = Object.values(data).reduce((a, b) => a + b, 0);
    if (total === 0) return {};
    const result = {};
    for (const [lang, bytes] of Object.entries(data)) {
      result[lang] = bytes / total;
    }
    return result;
  } catch {
    return {};
  }
}

async function loadOwnEmails() {
  if (!TOKEN) return new Set();
  try {
    const emails = await request('https://api.github.com/user/emails');
    return new Set(
      emails
        .filter((e) => e.verified && e.email)
        .map((e) => e.email.toLowerCase())
    );
  } catch {
    return new Set();
  }
}

const COMMIT_QUERY = `
query($owner:String!, $name:String!, $first:Int!, $after:String) {
  repository(owner:$owner, name:$name) {
    defaultBranchRef {
      target {
        ... on Commit {
          history(first:$first, after:$after) {
            pageInfo { hasNextPage endCursor }
            nodes {
              committedDate
              additions
              deletions
              author { user { login } email name }
              committer { user { login } email name }
            }
          }
        }
      }
    }
  }
}`;

function isUserCommit(node, myEmails) {
  const authorLogin =
    node.author?.user?.login || '';
  const committerLogin =
    node.committer?.user?.login || '';
  const authorEmail = (node.author?.email || '').toLowerCase();
  const committerEmail = (node.committer?.email || '').toLowerCase();

  if (
    authorLogin &&
    authorLogin.toLowerCase() === USERNAME.toLowerCase()
  )
    return true;
  if (
    committerLogin &&
    committerLogin.toLowerCase() === USERNAME.toLowerCase()
  )
    return true;
  if (myEmails.size > 0) {
    if (authorEmail && myEmails.has(authorEmail)) return true;
    if (committerEmail && myEmails.has(committerEmail)) return true;
  }
  return false;
}

async function* getCommitStats(fullName, myEmails) {
  if (!TOKEN) return;

  const [owner, name] = fullName.split('/');
  let cursor = null;
  let pageCount = 0;

  while (true) {
    let result;
    try {
      result = await graphql(COMMIT_QUERY, {
        owner,
        name,
        first: 100,
        after: cursor,
      });
    } catch {
      return;
    }

    const history =
      result?.data?.repository?.defaultBranchRef?.target?.history;
    if (!history) return;

    for (const node of history.nodes || []) {
      if (!isUserCommit(node, myEmails)) continue;
      const dateOnly = (node.committedDate || '').split('T')[0];
      if (!dateOnly) continue;
      const adds = Math.min(node.additions || 0, MAX_LINES_PER_COMMIT);
      const dels = Math.min(node.deletions || 0, MAX_LINES_PER_COMMIT);
      if (adds === 0 && dels === 0) continue;
      yield { date: dateOnly, additions: adds, deletions: dels };
    }

    const pi = history.pageInfo;
    if (!pi?.hasNextPage) return;
    cursor = pi.endCursor;
    pageCount++;
    if (pageCount > 500) return;
    await sleep(100);
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  if (!TOKEN) {
    console.warn('GITHUB_TOKEN not set — writing empty stats.');
    const outDir = path.join(__dirname, '..', 'src', 'frontend', 'public', 'data');
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'github-stats.json'), JSON.stringify({}, null, 2));
    return;
  }

  console.log(`Fetching GitHub data for user: ${USERNAME}`);
  const myEmails = await loadOwnEmails();
  console.log(`Loaded ${myEmails.size} verified emails.`);

  const repos = await getAllUserRepos();
  console.log(`Found ${repos.length} repositories.`);

  // Get language weights per repo
  const repoLangWeights = {};
  for (const repo of repos) {
    repoLangWeights[repo.full_name] = await getRepoLanguages(repo.full_name);
  }
  console.log('Fetched language weights for all repos.');

  const skillKeys = Object.keys(TRACKABLE_SKILLS);
  // { languageName: { "2024-01-15": { additions: N, deletions: N } } }
  const perLangDaily = {};
  for (const key of skillKeys) {
    perLangDaily[key] = {};
  }

  let processedCommits = 0;

  for (const repo of repos) {
    const weights = repoLangWeights[repo.full_name];
    if (!weights || Object.keys(weights).length === 0) continue;

    const interested = Object.keys(weights).filter((lang) =>
      skillKeys.some((sk) => sk.toLowerCase() === lang.toLowerCase())
    );
    if (interested.length === 0) continue;

    console.log(
      `Processing ${repo.full_name} (${interested.join(', ')})...`
    );

    for await (const commit of getCommitStats(repo.full_name, myEmails)) {
      let contributed = false;
      for (const lang of interested) {
        // Find the matching skill key (case-insensitive)
        const skillKey = skillKeys.find(
          (sk) => sk.toLowerCase() === lang.toLowerCase()
        );
        if (!skillKey) continue;

        const pct = weights[lang];
        const add = Math.round(commit.additions * pct);
        const del = Math.round(commit.deletions * pct);
        if (add === 0 && del === 0) continue;

        contributed = true;
        const bucket = perLangDaily[skillKey];
        if (!bucket[commit.date]) {
          bucket[commit.date] = { additions: add, deletions: del };
        } else {
          bucket[commit.date].additions += add;
          bucket[commit.date].deletions += del;
        }
      }
      if (contributed) processedCommits++;
    }
  }

  console.log(`Processed ${processedCommits} commits total.`);

  // Build cumulative series per language
  const output = {};
  let languagesWithData = 0;

  for (const lang of skillKeys) {
    const daily = perLangDaily[lang];
    const dates = Object.keys(daily).sort();
    if (dates.length === 0) continue;

    languagesWithData++;
    let cumAdd = 0;
    let cumDel = 0;
    output[lang] = dates.map((date) => {
      cumAdd += daily[date].additions;
      cumDel += daily[date].deletions;
      return { date, additions: cumAdd, deletions: cumDel };
    });
  }

  console.log(`Generated stats for ${languagesWithData} languages.`);

  const outDir = path.join(__dirname, '..', 'src', 'frontend', 'public', 'data');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'github-stats.json');
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
  console.log(`Wrote ${outPath}`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
