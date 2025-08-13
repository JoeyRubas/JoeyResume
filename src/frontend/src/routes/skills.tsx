import { createFileRoute } from '@tanstack/react-router'
import Skills from "../pages/skills/Skills.tsx";

export const Route = createFileRoute('/skills')({
  component: Skills,
})

