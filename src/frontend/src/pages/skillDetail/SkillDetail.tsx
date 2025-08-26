import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import apiService from '../../api/service';
import { Skill, SkillLevel } from '../../types/skill';
import LanguageStatsChart from '../../components/LanguageStatsChart';
import './styles.css';

function levelToString(level: number): string {
  switch (level) {
    case SkillLevel.Basic:
      return 'Basic';
    case SkillLevel.Novice:
      return 'Novice';
    case SkillLevel.Intermediate:
      return 'Intermediate';
    case SkillLevel.Advanced:
      return 'Advanced';
    case SkillLevel.Expert:
      return 'Expert';
    default:
      return 'Unknown';
  }
}

const SkillDetail: React.FC = () => {
  const { skillId } = useParams({ from: '/skill/$skillId' });
  const navigate = useNavigate();
  const [skill, setSkill] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSkill();
  }, [skillId]);

  const loadSkill = async () => {
    try {
      setLoading(true);
      setError(null);
      const skillData = await apiService.getSkill(skillId);
      setSkill(skillData);
    } catch (error) {
      console.error('Error loading skill:', error);
      setError('Failed to load skill details');
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    navigate({ to: '/skills' });
  };

  const getChipColor = (level: number) => {
    const chipColors = ['default', 'primary', 'secondary', 'success', 'error'];
    return chipColors[level] || 'default';
  };

  if (loading) {
    return (
      <Box
        className="skill-detail-container"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="skill-detail-container">
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton onClick={handleBackClick} sx={{ mr: 2 }} color="primary">
            ←
          </IconButton>
          <Typography variant="h5">Back to Skills</Typography>
        </Box>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!skill) {
    return (
      <Box className="skill-detail-container">
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton onClick={handleBackClick} sx={{ mr: 2 }} color="primary">
            ←
          </IconButton>
          <Typography variant="h5">Back to Skills</Typography>
        </Box>
        <Alert severity="warning">Skill not found</Alert>
      </Box>
    );
  }

  return (
    <Box className="skill-detail-container">
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <IconButton
          onClick={handleBackClick}
          sx={{ mr: 2 }}
          color="primary"
          size="large"
        >
          ←
        </IconButton>
        <Typography variant="h4" color="primary.main" fontWeight={600}>
          Back to Skills
        </Typography>
      </Box>

      <Paper elevation={3} className="skill-detail-card">
        <Box sx={{ p: 4 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              mb: 3,
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 'bold',
                color: 'text.primary',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              }}
            >
              {skill.name}
            </Typography>
            <Chip
              label={levelToString(skill.skillLevel)}
              color={getChipColor(skill.skillLevel) as any}
              size="medium"
              variant="filled"
              sx={{
                fontWeight: 600,
                fontSize: '1rem',
                padding: '8px 16px',
                height: 'auto',
              }}
            />
          </Box>

          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ mb: 4, fontWeight: 500 }}
          ></Typography>

          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.8,
              fontSize: '1.125rem',
            }}
          >
            {skill.description}
          </Typography>
        </Box>
      </Paper>
      
      {/* Only show GitHub stats for skills that can be tracked in GitHub */}
      {skill.canTrackInGitHub && (
        <LanguageStatsChart 
          languageName={skill.name} 
          gitHubAlias={skill.gitHubAlias} 
        />
      )}
    </Box>
  );
};

export default SkillDetail;
