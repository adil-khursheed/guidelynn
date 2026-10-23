import { capitalizeFirstLetter } from "@/lib/utils";

export type ProfileOption = {
  value: string;
  label: string;
};

export const skillsList: ProfileOption[] = [
  { value: "next.js", label: "Next.js" },
  { value: "react", label: "React" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "sql", label: "SQL" },
  { value: "research", label: "Research" },
  { value: "communication", label: "Communication" },
  { value: "writing", label: "Writing" },
  { value: "design", label: "Design" },
  { value: "data analysis", label: "Data analysis" },
  { value: "project management", label: "Project management" },
];

export const educationList: ProfileOption[] = [
  { value: "high_school", label: "High School" },
  { value: "associate_degree", label: "Associate Degree" },
  { value: "bachelors_degree", label: "Bachelor's Degree" },
  { value: "masters_degree", label: "Master's Degree" },
  { value: "doctorate", label: "Doctorate / PhD" },
  { value: "professional_certification", label: "Professional Certification" },
  { value: "vocational_training", label: "Vocational Training" },
  { value: "bootcamp", label: "Bootcamp" },
  { value: "self_taught", label: "Self-taught" },
  { value: "other", label: "Other" },
];

export const interestsList: ProfileOption[] = [
  { value: "ux research", label: "UX research" },
  { value: "product design", label: "Product design" },
  { value: "ai", label: "AI & automation" },
  { value: "sustainability", label: "Sustainability" },
  { value: "education", label: "Education" },
  { value: "entrepreneurship", label: "Entrepreneurship" },
  { value: "public health", label: "Public health" },
  { value: "creative writing", label: "Creative writing" },
  { value: "data", label: "Data & analytics" },
];

export const careerStageOptions = [
  "Student",
  "Final year",
  "Recent graduate",
  "Early career",
  "Career switcher",
  "Between roles",
];

export const industryOptions = [
  "Technology",
  "Design",
  "Education",
  "Healthcare",
  "Finance",
  "Marketing",
  "Nonprofit",
  "Public sector",
];

export const getOptionLabel = (
  options: ProfileOption[],
  value: string | null | undefined
) => {
  if (!value) return "";
  const option = options.find(
    (item) => item.value.toLowerCase() === value.toLowerCase()
  );
  return option?.label ?? capitalizeFirstLetter(value);
};
