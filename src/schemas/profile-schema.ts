import { z } from "zod";

export const ProfileFormSchema = z.object({
  currentRole: z.string().trim().min(1, "This field is required"),
  experience: z.string().trim().min(1, "This field is required"),
  industry: z.string().trim().min(1, "This field is required"),
  skills: z.array(z.string()).min(1, "Select at least 1 item"),
  interests: z.array(z.string()).optional(),
  education: z.string().trim().min(1, "This field is required"),
  location: z.string().trim().min(1, "This field is required"),
  careerStage: z.string().trim().min(1, "This field is required"),
});
