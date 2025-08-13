import { createFileRoute } from '@tanstack/react-router'
import Hobbies from "../pages/hobbies/Hobbies.tsx";

export const Route = createFileRoute('/hobbies')({
  component: Hobbies,
})