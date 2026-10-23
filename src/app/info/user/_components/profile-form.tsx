"use client";

import * as React from "react";
import { z } from "zod";
import { useForm, useWatch, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2Icon,
  Minus,
  Plus,
} from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { ProfileFormSchema } from "@/schemas/profile-schema";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTRPC } from "@/trpc/client";

import { ChipPicker } from "./chip-picker";
import { ProfileFile } from "./profile-file";
import {
  careerStageOptions,
  educationList,
  industryOptions,
  interestsList,
  skillsList,
} from "./profile-options";

type ProfileFormValues = z.infer<typeof ProfileFormSchema>;

const subtleText = "text-secondary-foreground dark:text-muted-foreground";

const primaryAction =
  "bg-[oklch(0.5583_0.1276_42.9956)] text-white hover:bg-[oklch(0.505_0.118_43)] dark:bg-[oklch(0.6724_0.1308_38.7559)] dark:text-[oklch(0.1908_0.002_106.5859)] dark:hover:bg-[oklch(0.715_0.128_38.5)]";

const placeholderTone =
  "placeholder:text-secondary-foreground/90 dark:placeholder:text-muted-foreground";

type StepDefinition = {
  label: string;
  title: string;
  hint: string;
  fields: FieldPath<ProfileFormValues>[];
};

const steps: StepDefinition[] = [
  {
    label: "Where you are",
    title: "Where you are right now",
    hint: "A snapshot, not a résumé. Pick what's closest and move on.",
    fields: ["education", "currentRole", "careerStage", "location"],
  },
  {
    label: "What you bring",
    title: "What you're working with",
    hint: "The skills and time you already have. Honest beats impressive.",
    fields: ["experience", "industry", "skills"],
  },
  {
    label: "What pulls you",
    title: "What pulls you forward",
    hint: "Optional, but it's how we connect the dots between your options.",
    fields: [],
  },
];

const requiredFields = [
  "education",
  "currentRole",
  "careerStage",
  "location",
  "experience",
  "industry",
  "skills",
] as const;

const firstMissingStep = (values: Partial<ProfileFormValues>) => {
  const missing = requiredFields.find((field) => {
    const value = values[field];
    if (Array.isArray(value)) return value.length === 0;
    return !value?.trim();
  });

  if (!missing) return steps.length - 1;
  return steps.findIndex((step) => step.fields.includes(missing));
};

const QuickPicks = ({
  label,
  options,
  value,
  onChange,
  disabled,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) => (
  <div role="group" aria-label={label} className="flex flex-wrap gap-1.5">
    {options.map((option) => {
      const active = value.toLowerCase() === option.toLowerCase();
      return (
        <button
          key={option}
          type="button"
          aria-pressed={active}
          disabled={disabled}
          onClick={() => onChange(active ? "" : option)}
          className={cn(
            "inline-flex h-7 items-center gap-1.5 rounded-md border px-2.5 text-xs transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
            active
              ? "border-primary/40 bg-primary/5 font-medium text-foreground"
              : "border-border bg-background text-secondary-foreground hover:bg-muted/50 hover:text-foreground dark:text-muted-foreground"
          )}>
          {active ? <Check className="size-3 text-primary" /> : null}
          {option}
        </button>
      );
    })}
  </div>
);

const StepRail = ({
  step,
  onSelect,
}: {
  step: number;
  onSelect: (step: number) => void;
}) => (
  <ol className="grid grid-cols-3 border-b border-border">
    {steps.map((item, index) => {
      const done = index < step;
      const current = index === step;

      return (
        <li key={item.label} className="relative">
          <button
            type="button"
            onClick={() => (done ? onSelect(index) : undefined)}
            disabled={!done}
            aria-current={current ? "step" : undefined}
            aria-label={
              done
                ? `Go back to ${item.label}`
                : `Step ${index + 1}: ${item.label}`
            }
            className={cn(
              "flex w-full flex-col gap-1 px-4 py-3 text-left transition-colors sm:px-5",
              done && "cursor-pointer hover:bg-muted/40",
              current && "bg-muted/30"
            )}>
            <span
              className={cn(
                "flex items-center gap-1.5 text-[10px] uppercase tracking-[0.09em]",
                done || current ? "text-foreground" : subtleText
              )}>
              {done ? (
                <Check className="size-3 text-primary" aria-hidden="true" />
              ) : (
                <span
                  aria-hidden="true"
                  className={cn(
                    "size-1.5 rounded-full",
                    current ? "bg-primary" : "bg-input"
                  )}
                />
              )}
              {done ? "Noted" : `Step ${index + 1}`}
            </span>
            <span
              className={cn(
                "truncate text-xs sm:text-sm",
                current
                  ? "font-medium text-foreground"
                  : subtleText
              )}>
              {item.label}
            </span>
          </button>
          <span
            aria-hidden="true"
            className={cn(
              "absolute inset-x-0 bottom-0 h-0.5",
              index <= step ? "bg-primary" : "bg-transparent"
            )}
          />
        </li>
      );
    })}
  </ol>
);

const ProfileForm = ({
  name,
  initialValues,
  isEditing = false,
}: {
  name: string;
  initialValues?: Partial<ProfileFormValues>;
  isEditing?: boolean;
}) => {
  const [step, setStep] = React.useState(0);
  const headingRef = React.useRef<HTMLHeadingElement | null>(null);
  const focusHeadingOnMount = React.useRef(false);
  const reduceMotion = useReducedMotion();
  const router = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileFormSchema),
    mode: "onTouched",
    defaultValues: {
      currentRole: initialValues?.currentRole ?? "",
      experience: initialValues?.experience ?? "",
      industry: initialValues?.industry ?? "",
      skills: initialValues?.skills ?? [],
      interests: initialValues?.interests ?? [],
      education: initialValues?.education ?? "",
      location: initialValues?.location ?? "",
      careerStage: initialValues?.careerStage ?? "",
    },
  });

  const values = useWatch({ control: form.control }) as Partial<ProfileFormValues>;

  const filled = requiredFields.filter((field) => {
    const value = values[field];
    if (Array.isArray(value)) return value.length > 0;
    return Boolean(value?.trim());
  }).length;
  const complete = filled === requiredFields.length;

  const { mutateAsync, isPending } = useMutation(
    trpc.profile.update.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.profile.get.queryKey(),
        });
      },
      onError: (error) => {
        console.error("profile update failed", error);
      },
    })
  );

  const setHeadingRef = React.useCallback((node: HTMLHeadingElement | null) => {
    headingRef.current = node;
    if (node && focusHeadingOnMount.current) {
      focusHeadingOnMount.current = false;
      node.focus();
    }
  }, []);

  const goToStep = (next: number) => {
    focusHeadingOnMount.current = true;
    setStep(Math.max(0, Math.min(steps.length - 1, next)));
  };

  const handleProfileSubmit = async (data: ProfileFormValues) => {
    try {
      await mutateAsync(data);
      toast.success(
        isEditing
          ? "Your file is updated."
          : "Your file is ready. Let's start the conversation."
      );
      router.replace("/new");
    } catch {
      toast.error("We couldn't save your file. Try again in a moment.");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isPending) return;

    if (step < steps.length - 1) {
      const valid = await form.trigger(steps[step].fields, {
        shouldFocus: true,
      });
      if (valid) goToStep(step + 1);
      return;
    }

    const missing = firstMissingStep(form.getValues());
    if (missing !== steps.length - 1) {
      toast.error("A few required answers are still empty.");
      goToStep(missing);
      return;
    }

    await form.handleSubmit(handleProfileSubmit)();
  };

  const firstName = name.trim().split(" ")[0] || "there";
  const isLastStep = step === steps.length - 1;
  const missingStep = firstMissingStep(values);

  return (
    <div className="mx-auto grid w-full max-w-245 gap-6 lg:grid-cols-[minmax(0,576px)_320px] lg:items-start lg:gap-8">
      <div className="min-w-0">
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <div className="flex h-11 items-center justify-between gap-4 border-b border-border px-5 text-[10px] uppercase tracking-[0.09em] sm:px-7">
            <div className="flex items-center gap-2.5">
              <span className="size-1.5 rounded-full bg-primary" />
              <span className="font-semibold text-foreground">
                Profile intake
              </span>
              <span className={subtleText}>
                {isEditing ? "Update" : "First visit"}
              </span>
            </div>
            <span className={cn("tabular-nums", subtleText)}>
              Step {step + 1} of {steps.length}
            </span>
          </div>

          <div className="border-b border-border px-5 py-6 sm:px-7 sm:py-7">
            <h1 className="font-serif text-4xl leading-none tracking-[-0.03em] text-balance">
              Hello, {firstName}.
            </h1>
            <p
              className={cn(
                "mt-3 max-w-[46ch] text-[15px] leading-6",
                subtleText
              )}>
              Three short questions so the next conversation starts from where
              you actually are — not a blank page.
            </p>
          </div>

          <StepRail step={step} onSelect={goToStep} />

          <Form {...form}>
            <form onSubmit={handleSubmit} noValidate>
              <div className="px-5 py-6 sm:px-7 sm:py-7">
                <p className="sr-only" aria-live="polite">
                  Step {step + 1} of {steps.length}: {steps[step].label}
                </p>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={step}
                    initial={
                      reduceMotion ? false : { opacity: 0, y: 10 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    exit={
                      reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }
                    }
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { duration: 0.22, ease: [0.16, 1, 0.3, 1] }
                    }>
                    <div className="mb-5">
                      <h2
                        ref={setHeadingRef}
                        tabIndex={-1}
                        className="text-lg font-semibold tracking-[-0.01em] outline-none">
                        {steps[step].title}
                      </h2>
                      <p
                        className={cn(
                          "mt-1 text-sm leading-6",
                          subtleText
                        )}>
                        {steps[step].hint}
                      </p>
                    </div>

                    {step === 0 ? (
                      <div className="space-y-5">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <FormField
                            control={form.control}
                            name="education"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Education</FormLabel>
                                <Select
                                  value={field.value || undefined}
                                  onValueChange={field.onChange}
                                  disabled={isPending}>
                                  <FormControl>
                                    <SelectTrigger
                                      ref={field.ref}
                                      className="w-full data-[placeholder]:text-secondary-foreground dark:data-[placeholder]:text-muted-foreground">
                                      <SelectValue placeholder="Highest level" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {educationList.map((item) => (
                                      <SelectItem
                                        key={item.value}
                                        value={item.value}>
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
                            name="location"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    disabled={isPending}
                                    maxLength={80}
                                    autoComplete="address-level2"
                                    placeholder="City, country"
                                    className={placeholderTone}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="currentRole"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Current role</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  disabled={isPending}
                                  maxLength={80}
                                  autoComplete="organization-title"
                                  placeholder="e.g. Final-year student, retail associate"
                                  className={placeholderTone}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="careerStage"
                          render={({ field, fieldState }) => (
                            <FormItem>
                              <FormLabel>Current stage</FormLabel>
                              <QuickPicks
                                label="Current stage shortcuts"
                                options={careerStageOptions}
                                value={field.value}
                                onChange={field.onChange}
                                disabled={isPending}
                              />
                              <FormControl>
                                <Input
                                  {...field}
                                  disabled={isPending}
                                  maxLength={60}
                                  placeholder="Or write it in your own words"
                                  className={placeholderTone}
                                />
                              </FormControl>
                              {!fieldState.error ? (
                                <FormDescription className={subtleText}>
                                  Pick a shortcut or write your own.
                                </FormDescription>
                              ) : null}
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ) : null}

                    {step === 1 ? (
                      <div className="space-y-5">
                        <FormField
                          control={form.control}
                          name="experience"
                          render={({ field, fieldState }) => {
                            const parsed = Number.parseInt(field.value, 10);
                            const years = Number.isNaN(parsed) ? 0 : parsed;
                            const setYears = (next: number) =>
                              field.onChange(
                                String(Math.min(50, Math.max(0, next)))
                              );

                            return (
                              <FormItem>
                                <FormLabel>Years of experience</FormLabel>
                                <div className="flex h-10 items-center gap-1 rounded-md border border-input bg-transparent p-1 shadow-xs transition-[color,box-shadow] focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 dark:bg-input/30">
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setYears(years - 1)}
                                    disabled={isPending || years <= 0}
                                    aria-label="Remove one year"
                                    className="size-8 cursor-pointer rounded-sm">
                                    <Minus className="size-3.5" />
                                  </Button>
                                  <div className="flex flex-1 items-baseline justify-center gap-1.5">
                                    <FormControl>
                                      <input
                                        {...field}
                                        value={field.value}
                                        onChange={(event) => {
                                          const digits =
                                            event.target.value.replace(
                                              /[^0-9]/g,
                                              ""
                                            );
                                          if (!digits) {
                                            field.onChange("");
                                            return;
                                          }
                                          field.onChange(
                                            String(
                                              Math.min(
                                                50,
                                                Number.parseInt(digits, 10)
                                              )
                                            )
                                          );
                                        }}
                                        disabled={isPending}
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        maxLength={2}
                                        placeholder="0"
                                        className={cn(
                                          "w-8 bg-transparent text-center text-base font-semibold tabular-nums outline-none disabled:opacity-50",
                                          placeholderTone
                                        )}
                                      />
                                    </FormControl>
                                    <span
                                      className={cn("text-xs", subtleText)}>
                                      years
                                    </span>
                                  </div>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setYears(years + 1)}
                                    disabled={isPending || years >= 50}
                                    aria-label="Add one year"
                                    className="size-8 cursor-pointer rounded-sm">
                                    <Plus className="size-3.5" />
                                  </Button>
                                </div>
                                {!fieldState.error ? (
                                  <FormDescription className={subtleText}>
                                    Count paid, freelance, or serious volunteer
                                    work. Zero is a real answer.
                                  </FormDescription>
                                ) : null}
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />

                        <FormField
                          control={form.control}
                          name="industry"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Industry</FormLabel>
                              <QuickPicks
                                label="Industry shortcuts"
                                options={industryOptions}
                                value={field.value}
                                onChange={field.onChange}
                                disabled={isPending}
                              />
                              <FormControl>
                                <Input
                                  {...field}
                                  disabled={isPending}
                                  maxLength={60}
                                  placeholder="Or name the world you want to work in"
                                  className={placeholderTone}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="skills"
                          render={({ field, fieldState }) => (
                            <FormItem>
                              <FormLabel>Skills</FormLabel>
                              <FormControl>
                                <ChipPicker
                                  options={skillsList}
                                  value={field.value}
                                  onValueChange={field.onChange}
                                  placeholder="Type a skill and press Enter"
                                  disabled={isPending}
                                  invalid={Boolean(fieldState.error)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ) : null}

                    {step === 2 ? (
                      <div className="space-y-5">
                        <FormField
                          control={form.control}
                          name="interests"
                          render={({ field, fieldState }) => (
                            <FormItem>
                              <FormLabel>
                                Interests
                                <span
                                  className={cn(
                                    "text-xs font-normal",
                                    subtleText
                                  )}>
                                  Optional
                                </span>
                              </FormLabel>
                              <FormControl>
                                <ChipPicker
                                  options={interestsList}
                                  value={field.value ?? []}
                                  onValueChange={field.onChange}
                                  placeholder="e.g. UX research, climate, teaching"
                                  disabled={isPending}
                                  invalid={Boolean(fieldState.error)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="rounded-lg border border-border bg-muted/30 p-4">
                          <div className="flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.09em]">
                            <span className="font-semibold text-foreground">
                              Before you save
                            </span>
                            <span
                              className={cn(
                                "tabular-nums",
                                complete ? "text-primary" : subtleText
                              )}>
                              {complete ? "Ready" : `${filled} of 7 answers`}
                            </span>
                          </div>
                          <p
                            className={cn(
                              "mt-2 text-sm leading-6",
                              subtleText
                            )}>
                            {complete
                              ? "Everything the counselor needs to start from your real context."
                              : "A few required answers are still empty. You can fill them in now or later."}
                          </p>
                          {!complete ? (
                            <button
                              type="button"
                              onClick={() => goToStep(missingStep)}
                              className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                              Go back and add it
                              <ArrowRight className="size-3.5" />
                            </button>
                          ) : null}
                        </div>
                      </div>
                    ) : null}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-border bg-muted/30 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                <p className={cn("text-xs leading-5", subtleText)}>
                  {isLastStep
                    ? "This becomes the starting point for every conversation."
                    : "Takes about two minutes. Change any of this later."}
                </p>
                <div className="flex items-center justify-center gap-2 sm:justify-end">
                  {step > 0 ? (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => goToStep(step - 1)}
                      disabled={isPending}
                      className="cursor-pointer">
                      <ArrowLeft />
                      Back
                    </Button>
                  ) : null}
                  <Button
                    type="submit"
                    disabled={isPending}
                    aria-busy={isPending}
                    className={cn("cursor-pointer", primaryAction)}>
                    {isPending ? (
                      <>
                        <Loader2Icon className="animate-spin" />
                        Saving
                      </>
                    ) : isLastStep ? (
                      <>
                        {isEditing ? "Save changes" : "Save & start"}
                        <ArrowRight />
                      </>
                    ) : (
                      <>
                        Continue
                        <ArrowRight />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>

        <p className={cn("mt-4 px-1 text-xs leading-5", subtleText)}>
          Your profile grounds every conversation and stays in your account. You
          can change it anytime.
        </p>
      </div>

      <ProfileFile
        values={values}
        name={name}
        isEditing={isEditing}
      />
    </div>
  );
};

export default ProfileForm;
