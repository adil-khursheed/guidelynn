"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { ProfileFormSchema } from "@/schemas/profile-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MultiSelect } from "@/components/ui/multi-select";
import { capitalizeFirstLetter } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";

const skillsList = [
  { value: "next.js", label: "Next.js" },
  { value: "react", label: "React" },
  { value: "vue", label: "Vue.js" },
  { value: "angular", label: "Angular" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "typescript", label: "Typescript" },
  { value: "javascript", label: "Javascript" },
  { value: "postgresql", label: "Postgresql" },
  { value: "mongodb", label: "MongoDB" },
];

const educationList = [
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

const interestsList: Array<{ label: string; value: string }> = [];

const ProfileForm = () => {
  const form = useForm<z.infer<typeof ProfileFormSchema>>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      careerStage: "",
      currentRole: "",
      education: "",
      experience: "",
      industry: "",
      interests: [],
      location: "",
      skills: [],
    },
  });

  const router = useRouter();

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation(
    trpc.profile.update.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.profile.get.queryKey(),
        });
      },
      onError: (error) => {
        console.log("onError =>", error);
        toast.error(`${error.message}`);
      },
    })
  );

  const handleProfileSubmit = async (
    data: z.infer<typeof ProfileFormSchema>
  ) => {
    try {
      await mutateAsync(data);
      router.replace("/new");
    } catch (error) {
      console.log("Err => ", error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleProfileSubmit)}
        className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="education"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Education</FormLabel>
                <Select
                  disabled={isPending}
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full h-9">
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {educationList.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currentRole"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Current Role</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="Enter your current role"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Skills</FormLabel>
              <FormControl>
                <MultiSelect
                  disabled={isPending}
                  options={skillsList}
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="Select your skills"
                  allowCustomItems={true}
                  onCustomItemCreate={(value) => ({
                    label: capitalizeFirstLetter(value),
                    value,
                  })}
                  createItemText={(value) => `Add "${value}" to your skills`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>{"Experience (In yrs)"}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="Enter your experience"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="careerStage"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Current Stage</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="Enter your current stage"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="interests"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Interests</FormLabel>
              <FormControl>
                <MultiSelect
                  disabled={isPending}
                  options={interestsList}
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="Select your interests"
                  allowCustomItems={true}
                  onCustomItemCreate={(value) => ({
                    label: capitalizeFirstLetter(value),
                    value,
                  })}
                  createItemText={(value) => `Add "${value}" to your interests`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="Enter your location"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Industry</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="Enter your industry"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full cursor-pointer">
          {isPending ? <Loader2Icon className="animate-spin" /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
