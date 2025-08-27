import { createFileRoute } from '@tanstack/react-router';
import ProjectDetail from '../pages/projectDetail/ProjectDetail';

export const Route = createFileRoute('/project/$projectId')({
  component: ProjectDetail,
});
