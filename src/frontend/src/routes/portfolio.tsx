import { createFileRoute } from '@tanstack/react-router'
import Portfolio from '../pages/portfolio/Portfolio';

export const Route = createFileRoute('/portfolio')({
  component: Portfolio,
})

