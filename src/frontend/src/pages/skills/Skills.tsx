import React, { useEffect, useState } from 'react';
import { Box, Paper, TextField, Button, Typography, Card, CardContent, CardActions, Chip, IconButton } from '@mui/material';
import apiService from '../../api/service';
import { Skill } from '../../types/skill';
import './styles.css';

function levelToString(level: number): string {
  const levels = ['Basic', 'Novice', 'Intermediate', 'Advanced', 'Expert'];
  return levels[level] || 'Unknown';
}

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '', skillLevel: '0', hoursExperience: '', description: ''
  });

  useEffect(() => { loadSkills(); }, []);

  const loadSkills = async () => {
    try {
      const skillsData = await apiService.getSkills();
      setSkills(skillsData);
    } catch (error) { console.error(error); } 
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.name.trim() && formData.description.trim() && formData.hoursExperience.trim()) {
      try {
        const skillData: Skill = {
          id: editingSkillId || '',
          name: formData.name.trim(),
          skillLevel: parseInt(formData.skillLevel),
          hoursExperience: parseInt(formData.hoursExperience),
          description: formData.description.trim()
        };
        
        if (editingSkillId) {
          await apiService.editSkill(skillData);
        } else {
          await apiService.createSkill(skillData);
        }
        
        await loadSkills();
        clearForm();
      } catch (error) { console.error(error); }
    }
  };

  const clearForm = () => {
    setFormData({ name: '', skillLevel: '0', hoursExperience: '', description: '' });
    setEditingSkillId(null);
  };

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const id = e.currentTarget.id?.replace("delete", "");
    if (!id) return;
    try {
      await apiService.deleteSkill(id);
      await loadSkills();
    } catch (error) { console.error(error); }
  };
    
  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const id = e.currentTarget.id?.replace("edit", "");
    const curSkill = skills.find(skill => skill.id === id);
    if (!curSkill) return;
    
    setFormData({
      name: curSkill.name,
      skillLevel: curSkill.skillLevel.toString(),
      hoursExperience: curSkill.hoursExperience.toString(),
      description: curSkill.description
    });
    setEditingSkillId(id);
  };

  function skillCard(skill: Skill) {
    const chipColors = ['default', 'primary', 'secondary', 'success', 'error'];
    const getChipColor = (level: number) => chipColors[level] || 'default';

    return (
      <Card 
        elevation={2} 
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid transparent',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 20px -5px rgb(0 0 0 / 0.15)',
            borderColor: 'primary.main',
          }
        }} 
        key={skill.id}
      >
        <CardContent sx={{ flexGrow: 1, position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
            <Typography 
              variant="h6" 
              component="h2" 
              sx={{ 
                fontWeight: 'bold', 
                mb: 1,
                color: 'text.primary'
              }}
            >
              {skill.name}
            </Typography>
            <Chip 
              label={levelToString(skill.skillLevel)} 
              color={getChipColor(skill.skillLevel) as any}
              size="small"
              variant="outlined"
              sx={{
                fontWeight: 600,
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                }
              }}
            />
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
            <strong>{skill.hoursExperience} hours</strong> of experience
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
            {skill.description}
          </Typography>
          
        
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end', pt: 0 }}>
          <IconButton size="small" color="primary" id={`edit${skill.id}`} onClick={handleEdit} sx={{ mr: 1 }} >
            ✏️
          </IconButton>
          <IconButton size="small" color="error" id={`delete${skill.id}`} onClick={handleDelete} >
            ❌
          </IconButton>
        </CardActions>
      </Card>
    );
  }

  return (
    <div className="skills-container">
      <Typography 
        variant="h4" 
        component="h1" 
        sx={{
          fontWeight: 600,
          color: 'primary.main',
          textAlign: 'center',
          mb: 4,
          mt: 3,
          fontSize: { xs: '1.8rem', sm: '2.1rem', md: '2.4rem' }
        }}
      >
        My Skills
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3, mb: 4, maxWidth: 800, mx: 'auto' }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <TextField label="Skill Name" name="name" value={formData.name} onChange={handleInputChange} required variant="outlined" size="small" sx={{ minWidth: 200, flex: 1 }} />
          
          <TextField select label="Skill Level" name="skillLevel" value={formData.skillLevel} onChange={handleInputChange} required variant="outlined" size="small" sx={{ minWidth: 150 }} >
            <option value="0">Basic</option>
            <option value="1">Novice</option>
            <option value="2">Intermediate</option>
            <option value="3">Advanced</option>
            <option value="4">Expert</option>
          </TextField>
          
          <TextField label="Hours Experience" name="hoursExperience" type="number" value={formData.hoursExperience} onChange={handleInputChange} required variant="outlined" size="small" />
          
          <TextField label="Skill Description" name="description" value={formData.description} onChange={handleInputChange} required 
                    variant="outlined" size="small" multiline rows={2} sx={{ minWidth: 250, flex: 1 }} />
          
          {editingSkillId ? (
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Button type="submit" variant="contained" color="primary" sx={{ minWidth: 120 }} >
                Edit Skill
              </Button>
              <Button type="button" onClick={clearForm} variant="outlined" color="error" sx={{ minWidth: 'auto', px: 1 }} >
                ❌
              </Button>
            </Box>
          ) : (
            <Button type="submit" variant="contained" color="primary" sx={{ minWidth: 120, alignSelf: 'flex-start' }} > Add Skill </Button>
          )}
        </Box>
      </Paper>
        
      <div className="skill-card-list">
        {skills.map(skill => skillCard(skill))}
      </div>
    </div>
  );
};

export default Skills;
