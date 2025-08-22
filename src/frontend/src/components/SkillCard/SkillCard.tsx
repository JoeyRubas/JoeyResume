import React, { memo, useCallback } from "react";
import { Skill } from "../../types/skill";

export interface SkillCardProps {
  skill: Skill;
  isAuthenticated: boolean;
  levelToString: (level: number) => string;
  handleSkillClick: (id: string) => void;
  handleEdit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
}


const SkillCard: React.FC<SkillCardProps> = memo(({
  skill,
  isAuthenticated,
  levelToString,
  handleSkillClick,
  handleEdit,
  handleDelete,
}) => {
  
  const onCardClick = useCallback(() => handleSkillClick(skill.id), [handleSkillClick, skill.id]);
  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") handleSkillClick(skill.id);
  }, [handleSkillClick, skill.id]);

  return (
    <div
      className="skill-card-v2"
      onClick={onCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div className="skill-card-top">
        <h3 className="skill-name">{skill.name}</h3>
        <span className={`badge level-${skill.skillLevel}`}>{levelToString(skill.skillLevel)}</span>
      </div>
      <div className="skill-meta">
        <strong>{skill.hoursExperience} hours</strong>
      </div>
      <div className="progress">
        <div className="progress-bar" style={{ width: `${(skill.skillLevel / 3) * 100}%` }} />
      </div>

      {isAuthenticated && (
        <div className="admin-actions">
          <button id={`edit${skill.id}`} className="btn ghost" onClick={handleEdit}>
            ✏️
          </button>
          <button id={`delete${skill.id}`} className="btn danger" onClick={handleDelete}>
            ❌
          </button>
        </div>
      )}
    </div>
  );
});

export default SkillCard;
