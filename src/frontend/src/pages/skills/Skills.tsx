import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import apiService from '../../api/service';
import { Skill } from '../../types/skill';
import ScrollIndicator from '../../components/Scroll/ScrollIndicator';
import SkillCard from '../../components/SkillCard/SkillCard';
import styles from '../../components/SkillCard/SkillCard.module.css';
import './styles.css';

function levelToString(level: number): string {
  const levels = ['Basic', 'Novice', 'Intermediate', 'Advanced', 'Expert'];
  return levels[level] || 'Unknown';
}

function deriveBand(s: Skill): 'Core' | 'Use' | 'Learning' {
  if (s.skillLevel >= 4 || s.hoursExperience >= 800) return 'Core';
  if (s.skillLevel >= 2 || s.hoursExperience >= 300) return 'Use';
  return 'Learning';
}

const Skills: React.FC = () => {
  const navigate = useNavigate();

  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    setLoading(true);
    try {
      const skillsData = await apiService.getSkills();
      setSkills(skillsData);
    } catch (error) {
      console.error('Failed to load skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSkillClick = (skillId: string) => {
    navigate({ to: '/skill/$skillId', params: { skillId } });
  };

  const grouped = useMemo(() => {
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
  }, [skills]);

  const yaml = useMemo(() => {
    const mk = (arr: Skill[]) =>
      arr.map(s => s.name.toLowerCase().replace(/\s+/g, '_')).join(', ');
    return [
      'skills.yaml:',
      '  groups:',
      `    Core: [${mk(grouped.Core)}]`,
      `    use: [${mk(grouped.Use)}]`,
      `    learning: [${mk(grouped.Learning)}]`,
    ].join('\n');
  }, [grouped]);

  return (
    <div className="skills-page">
      <section id="skills-hero" className="skills-hero">
        <div className="editor-panel">
          <div className="editor-chrome">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
            <span className="filename">skills.yaml</span>
          </div>
          <pre className="code-block">
            <code>{yaml}</code>
          </pre>
        </div>

        <div className="headline-side">
          <h1 className="headline">SKILLS ON THE CUTTING EDGE</h1>
          <p className="subhead">What I use to ship at scale</p>
        </div>

        <div className="hero-scroll-container">
          <ScrollIndicator targetId={loading ? "" : "skills-core"} bottom="20px" />
        </div>
      </section>

      {loading ? (
        <div className="skills-loading-container" style={{ minHeight: '30vh' }}>
          <div className="spinner"></div>
          <span style={{ color: '#667085', fontSize: '16px', fontWeight: 500 }}>
            Loading skills data...
          </span>
        </div>
      ) : (
        <>
          <section id="skills-core" className="group-section">
            <h2 className="group-title">Core</h2>
            <div className="skills-grid">
              {grouped.Core.map(skill => (
                <SkillCard
                  key={skill.id}
                  skill={skill}
                  isAuthenticated={false}
                  levelToString={levelToString}
                  handleSkillClick={handleSkillClick}
                  handleEdit={() => {}}
                  handleDelete={() => {}}
                />
              ))}
            </div>
          </section>

          <section id="skills-use" className="group-section">
            <h2 className="group-title">Use</h2>
            <div className="skills-grid">
              {grouped.Use.map(skill => (
                <SkillCard
                  key={skill.id}
                  skill={skill}
                  isAuthenticated={false}
                  levelToString={levelToString}
                  handleSkillClick={handleSkillClick}
                  handleEdit={() => {}}
                  handleDelete={() => {}}
                />
              ))}
            </div>
          </section>

          <section id="skills-learning" className="group-section last">
            <h2 className="group-title">Learning</h2>
            <div className="skills-grid">
              {grouped.Learning.map(skill => (
                <SkillCard
                  key={skill.id}
                  skill={skill}
                  isAuthenticated={false}
                  levelToString={levelToString}
                  handleSkillClick={handleSkillClick}
                  handleEdit={() => {}}
                  handleDelete={() => {}}
                />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Skills;
