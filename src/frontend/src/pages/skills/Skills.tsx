import React, { useEffect, useMemo, useState } from "react";
import SkillForm from "./SkillForm";
import { useNavigate } from "@tanstack/react-router";
import apiService from "../../api/service";
import { Skill } from "../../types/skill";
import { useAuth } from "../../hooks/useAuth";
import ScrollIndicator from "../../components/Scroll/ScrollIndicator";
import "./styles.css";

function levelToString(level: number): string {
  const levels = ["Basic", "Novice", "Intermediate", "Advanced", "Expert"];
  return levels[level] || "Unknown";
}

function deriveBand(s: Skill): "Core" | "Use" | "Learning" {
  if (s.skillLevel >= 4 || s.hoursExperience >= 800) return "Core";
  if (s.skillLevel >= 2 || s.hoursExperience >= 300) return "Use";
  return "Learning";
}

const Skills: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, loading: authLoading } = useAuth();

  const [skills, setSkills] = useState<Skill[]>([]);
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    skillLevel: "0",
    hoursExperience: "",
    description: "",
  });

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const skillsData = await apiService.getSkills();
      setSkills(skillsData);
    } catch (error) {
      console.error("Failed to load skills:", error);
    }
  };

  const handleSkillClick = (skillId: string) => {
    navigate({ to: "/skill/$skillId", params: { skillId } });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      formData.name.trim() &&
      formData.description.trim() &&
      formData.hoursExperience.trim()
    ) {
      try {
        const skillData: Skill = {
          id: editingSkillId || "",
          name: formData.name.trim(),
          skillLevel: parseInt(formData.skillLevel, 10),
          hoursExperience: parseInt(formData.hoursExperience, 10),
          description: formData.description.trim(),
        };

        if (editingSkillId) {
          await apiService.editSkill(skillData);
        } else {
          await apiService.createSkill(skillData);
        }

        await loadSkills();
        clearForm();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const clearForm = () => {
    setFormData({
      name: "",
      skillLevel: "0",
      hoursExperience: "",
      description: "",
    });
    setEditingSkillId(null);
  };

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const id = e.currentTarget.id?.replace("delete", "");
    if (!id) return;
    try {
      await apiService.deleteSkill(id);
      await loadSkills();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const id = e.currentTarget.id?.replace("edit", "");
    const curSkill = skills.find((s) => s.id === id);
    if (!curSkill) return;

    setFormData({
      name: curSkill.name,
      skillLevel: curSkill.skillLevel.toString(),
      hoursExperience: curSkill.hoursExperience.toString(),
      description: curSkill.description,
    });
    setEditingSkillId(id);
  };

  const handleLogout = async () => {
    await logout();
  };

  const grouped = useMemo(() => {
    const by: Record<"Core" | "Use" | "Learning", Skill[]> = {
      Core: [],
      Use: [],
      Learning: [],
    };
    skills.forEach((s) => by[deriveBand(s)].push(s));
    (Object.keys(by) as Array<keyof typeof by>).forEach((k) =>
      by[k].sort((a, b) => b.skillLevel - a.skillLevel || b.hoursExperience - a.hoursExperience)
    );
    return by;
  }, [skills]);

  const yaml = useMemo(() => {
    const mk = (arr: Skill[]) =>
      arr.map((s) => s.name.toLowerCase().replace(/\s+/g, "_")).join(", ");
    return [
      "skills.yaml:",
      "  groups:",
      `    Core: [${mk(grouped.Core)}]`,
      `    use: [${mk(grouped.Use)}]`,
      `    learning: [${mk(grouped.Learning)}]`,
    ].join("\n");
  }, [grouped]);

  if (authLoading) {
    return (
      <div className="skills-container">
        <div className="loading">Loading…</div>
      </div>
    );
  }

  const SkillCard = (skill: Skill) => (
    <div
      className="skill-card-v2"
      key={skill.id}
      onClick={() => handleSkillClick(skill.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleSkillClick(skill.id)}
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
          <ScrollIndicator targetId="skills-core" bottom="20px" />
        </div>
      </section>

      {isAuthenticated && (
        <section className="admin-banner">
          <div className="banner-left">Admin Mode — edit enabled</div>
          <button className="btn outline" onClick={handleLogout}>
            Logout
          </button>
        </section>
      )}

      {isAuthenticated && (
        <section className="editor-form">
          <SkillForm
            formData={formData}
            editingSkillId={editingSkillId}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            clearForm={clearForm}
          />
        </section>
      )}

      {/* Grouped grids */}
      <section id="skills-core" className="group-section">
        <h2 className="group-title">Core</h2>
        <div className="skills-grid">{grouped.Core.map(SkillCard)}</div>
      </section>

      <section id="skills-use" className="group-section">
        <h2 className="group-title">Use</h2>
        <div className="skills-grid">{grouped.Use.map(SkillCard)}</div>
      </section>

      <section id="skills-learning" className="group-section last">
        <h2 className="group-title">Learning</h2>
        <div className="skills-grid">{grouped.Learning.map(SkillCard)}</div>
      </section>
    </div>
  );
};

export default Skills;
