import React, { useEffect, useMemo, useState } from 'react';
import SkillForm from './SkillForm';
import SkillsHeader from './SkillsHeader';
import SkillGroup from './SkillGroup';
import { useNavigate } from '@tanstack/react-router';
import apiService from '../../api/service';
import { Skill } from '../../types/skill';
import { useAuth } from '../../hooks/useAuth';
import { levelToString, groupSkills } from './utils';
import styles from '../../components/SkillCard/SkillCard.module.css';
import './styles.css';

const Skills: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, loading: authLoading } = useAuth();

  const [skills, setSkills] = useState<Skill[]>([]);
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    skillLevel: '0',
    hoursExperience: '',
    description: '',
  });

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const skillsData = await apiService.getSkills();
      setSkills(skillsData);
    } catch (error) {
      console.error('Failed to load skills:', error);
    }
  };

  const handleSkillClick = (skillId: string) => {
    navigate({ to: '/skill/$skillId', params: { skillId } });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const clearForm = () => {
    setFormData({
      name: '',
      skillLevel: '0',
      hoursExperience: '',
      description: '',
    });
    setEditingSkillId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const skillData: Skill = {
        id: editingSkillId || '',
        name: formData.name,
        skillLevel: parseInt(formData.skillLevel),
        hoursExperience: parseInt(formData.hoursExperience),
        description: formData.description,
      };

      if (editingSkillId) {
        await apiService.editSkill(skillData);
      } else {
        await apiService.createSkill(skillData);
      }

      clearForm();
      await loadSkills();
    } catch (error) {
      console.error('Failed to save skill:', error);
    }
  };

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const id = e.currentTarget.id?.replace('delete', '');
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
    const id = e.currentTarget.id?.replace('edit', '');
    const curSkill = skills.find(s => s.id === id);
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

  const grouped = useMemo(() => groupSkills(skills), [skills]);

  const skillGroups = [
    { title: 'Core', skills: grouped.Core },
    { title: 'Use', skills: grouped.Use },
    { title: 'Learning', skills: grouped.Learning },
  ];

  return (
    <div className="skills-page">
      <SkillsHeader 
        isAuthenticated={isAuthenticated}
        authLoading={authLoading}
        handleLogout={handleLogout}
      />

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

      {skillGroups.map((group, index) => (
        <SkillGroup
          key={group.title}
          title={group.title}
          skills={group.skills}
          isAuthenticated={isAuthenticated}
          levelToString={levelToString}
          handleSkillClick={handleSkillClick}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          isLast={index === skillGroups.length - 1}
        />
      ))}
    </div>
  );
};

export default Skills;