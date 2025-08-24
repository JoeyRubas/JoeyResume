import { createFileRoute } from '@tanstack/react-router';
import Resume from '../pages/resume/Resume';

export const Route = createFileRoute('/resume')({
  component: Resume,
});
