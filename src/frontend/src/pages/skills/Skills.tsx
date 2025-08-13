import React, { useEffect, useState } from 'react';
import { Box, Paper, TextField, Button, Typography, Card, CardContent, CardActions, Chip, IconButton } from '@mui/material';
import api from '../../api/service';
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
      const skillsData = await api.getSkills();
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
          await api.editSkill(skillData);
        } else {
          await api.createSkill(skillData);
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
      await api.deleteSkill(id);
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
      <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} key={skill.id}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
            <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
              {skill.name}
            </Typography>
            <Chip 
              label={levelToString(skill.skillLevel)} 
              color={getChipColor(skill.skillLevel) as any}
              size="small"
              variant="outlined"
            />
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Hours Experience: {skill.hoursExperience}
          </Typography>
          <Typography variant="body2">
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
      <Typography variant="h3" component="h1" className="skills-header" gutterBottom>
        My Skills:
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
        
      <div className="skill-card-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', maxWidth: '1200px', }} >
        {skills.map(skill => skillCard(skill))}
      </div>
    </div>
  );
};

export default Skills;
