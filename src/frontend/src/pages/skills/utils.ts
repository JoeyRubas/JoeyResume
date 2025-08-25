import { Skill } from '../../types/skill';

export function levelToString(level: number): string {
  const levels = ['Basic', 'Novice', 'Intermediate', 'Advanced', 'Expert'];
  return levels[level] || 'Unknown';
}

export function deriveBand(s: Skill): 'Core' | 'Use' | 'Learning' {
  if (s.skillLevel >= 4 || s.hoursExperience >= 800) return 'Core';
  if (s.skillLevel >= 2 || s.hoursExperience >= 300) return 'Use';
  return 'Learning';
}

export function groupSkills(skills: Skill[]) {
  const by: Record<'Core' | 'Use' | 'Learning', Skill[]> = {
    Core: [],
    Use: [],
    Learning: [],
  };
  
  skills.forEach(s => by[deriveBand(s)].push(s));
  
  (Object.keys(by) as Array<keyof typeof by>).forEach(k =>
    by[k].sort(
      (a, b) =>
        b.skillLevel - a.skillLevel || b.hoursExperience - a.hoursExperience
    )
  );
  
  return by;
}