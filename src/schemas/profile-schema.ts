import { z } from "zod";

export const ProfileFormSchema = z.object({
  currentRole: z
    .string()
    .trim()
    .min(1, "Add your current role. Student counts."),
  experience: z
    .string()
    .trim()
    .min(1, "How many years? Zero is a real answer."),
  industry: z
    .string()
    .trim()
    .min(1, "Name the industry you work in, or want to."),
  skills: z.array(z.string()).min(1, "Add at least one skill."),
  interests: z.array(z.string()).optional(),
  education: z.string().trim().min(1, "Choose your highest level of education."),
  location: z.string().trim().min(1, "Where are you based?"),
  careerStage: z.string().trim().min(1, "Pick a stage or write your own."),
});
