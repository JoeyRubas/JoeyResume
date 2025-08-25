import React from 'react';
import SkillCard from '../../components/SkillCard/SkillCard';
import { Skill } from '../../types/skill';

interface SkillGroupProps {
  title: string;
  skills: Skill[];
  isAuthenticated: boolean;
  levelToString: (level: number) => string;
  handleSkillClick: (skillId: string) => void;
  handleEdit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isLast?: boolean;
}

const SkillGroup: React.FC<SkillGroupProps> = ({
  title,
  skills,
  isAuthenticated,
  levelToString,
  handleSkillClick,
  handleEdit,
  handleDelete,
  isLast = false
}) => {
  const sectionClass = `group-section${isLast ? ' last' : ''}`;
  const sectionId = `skills-${title.toLowerCase()}`;

  return (
    <section id={sectionId} className={sectionClass}>
      <h2 className="group-title">{title}</h2>
      <div className="skills-grid">
        {skills.map(skill => (
          <SkillCard
            key={skill.id}
            skill={skill}
            isAuthenticated={isAuthenticated}
            levelToString={levelToString}
            handleSkillClick={handleSkillClick}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </section>
  );
};

export default SkillGroup;