import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import apiService from '../../api/service';
import { Project, ProjectStatus } from '../../types/project';
import './styles.css';

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  });
};

const getStatusClass = (status: ProjectStatus): string => {
  switch (status) {
    case ProjectStatus.Completed: return 'status-completed';
    case ProjectStatus.InProgress: return 'status-progress';
    case ProjectStatus.Maintenance: return 'status-maintenance';
    case ProjectStatus.Archived: return 'status-archived';
    default: return 'status-default';
  }
};

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams({ from: '/project/$projectId' });
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProject();
  }, [projectId]);

  const loadProject = async () => {
    try {
      setLoading(true);
      setError(null);
      const projectData = await apiService.getProject(projectId);
      setProject(projectData);
    } catch (error) {
      console.error('Error loading project:', error);
      setError('Failed to load project details');
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    navigate({ to: '/projects' });
  };

  if (loading) {
    return (
      <div className="project-detail-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="project-detail-container">
        <header className="header">
          <button onClick={handleBackClick} className="back-btn">← Back to Projects</button>
        </header>
        <div className="error">{error || 'Project not found'}</div>
      </div>
    );
  }

  return (
    <div className="project-detail-container">
      <header className="header">
        <button onClick={handleBackClick} className="back-btn">← Back to Projects</button>
      </header>

      <div className="project-card">
        <div className="project-header">
          <div className="title-section">
            <h1>{project.name}</h1>
            <p className="subtitle">{project.description}</p>
          </div>
          <div className="meta-section">
            <span className={`status ${getStatusClass(project.status)}`}>{project.status}</span>
            <div className="links">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  GitHub
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="project-details">
          <div className="detail-item">
            <strong>Role:</strong> {project.role}
          </div>
          <div className="detail-item">
            <strong>Team Size:</strong> {project.teamSize} {project.teamSize === 1 ? 'person' : 'people'}
          </div>
          <div className="detail-item">
            <strong>Timeline:</strong> {formatDate(project.startDate)}
            {project.endDate && ` - ${formatDate(project.endDate)}`}
          </div>
          <div className="detail-item">
            <strong>Technologies:</strong>
            <div className="tech-tags">
              {project.skillsUsed.map((skill, index) => (
                <span key={index} className="tech-tag">{skill}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="description-section">
          <h2>About This Project</h2>
          <p>{project.longDescription}</p>
        </div>

        <div className="features-grid">
          <div className="feature-column">
            <h3>Key Features</h3>
            <ul>
              {project.keyFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          
          <div className="feature-column">
            <h3>Challenges Faced</h3>
            <ul>
              {project.challengesFaced.map((challenge, index) => (
                <li key={index}>{challenge}</li>
              ))}
            </ul>
          </div>
          
          <div className="feature-column">
            <h3>Lessons Learned</h3>
            <ul>
              {project.lessonsLearned.map((lesson, index) => (
                <li key={index}>{lesson}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
