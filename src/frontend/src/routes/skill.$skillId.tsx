import { createFileRoute } from '@tanstack/react-router'
import SkillDetail from "../pages/skillDetail/SkillDetail.tsx";

export const Route = createFileRoute('/skill/$skillId')({
  component: SkillDetail,
})
