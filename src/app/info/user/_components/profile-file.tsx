"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { z } from "zod";

import type { ProfileFormSchema } from "@/schemas/profile-schema";
import { cn } from "@/lib/utils";

import {
  educationList,
  getOptionLabel,
  interestsList,
  skillsList,
} from "./profile-options";

type ProfileValues = Partial<z.infer<typeof ProfileFormSchema>>;

const subtleText = "text-secondary-foreground dark:text-muted-foreground";

const requiredFields = [
  "education",
  "currentRole",
  "careerStage",
  "location",
  "experience",
  "industry",
  "skills",
] as const;

const experienceLabel = (value?: string) => {
  if (!value?.trim()) return "";
  const years = Number(value);
  if (Number.isNaN(years)) return value;
  return `${years} ${years === 1 ? "year" : "years"}`;
};

const FileRow = ({
  label,
  children,
  empty,
}: {
  label: string;
  children: React.ReactNode;
  empty?: boolean;
}) => (
  <div className="grid grid-cols-[92px_minmax(0,1fr)] items-baseline gap-3 py-2">
    <dt
      className={cn(
        "text-[10px] uppercase tracking-[0.09em]",
        subtleText
      )}>
      {label}
    </dt>
    <dd
      className={cn(
        "text-sm leading-5 text-foreground",
        empty && subtleText
      )}>
      {children}
    </dd>
  </div>
);

const ValueChips = ({ items }: { items: string[] }) => (
  <span className="flex flex-wrap gap-1">
    {items.map((item) => (
      <span
        key={item}
        className="inline-flex h-5 items-center rounded border border-border bg-background px-1.5 text-[11px]">
        {item}
      </span>
    ))}
  </span>
);

export const ProfileFile = ({
  values,
  name,
  isEditing,
}: {
  values: ProfileValues;
  name: string;
  isEditing: boolean;
}) => {
  const reduceMotion = useReducedMotion();
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  const filled = requiredFields.filter((field) => {
    const value = values[field];
    if (Array.isArray(value)) return value.length > 0;
    return Boolean(value?.trim());
  }).length;

  const complete = filled === requiredFields.length;
  const skills = (values.skills ?? []).map((item) =>
    getOptionLabel(skillsList, item)
  );
  const interests = (values.interests ?? []).map((item) =>
    getOptionLabel(interestsList, item)
  );

  return (
    <aside
      aria-label="Live profile preview"
      className="lg:sticky lg:top-24">
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="flex h-11 items-center justify-between gap-4 border-b border-border px-4 text-[10px] uppercase tracking-[0.09em]">
          <div className="flex items-center gap-2.5">
            <span className="size-1.5 rounded-full bg-primary" />
            <span className="font-semibold text-foreground">Your file</span>
          </div>
          <span className={subtleText}>
            {isEditing ? "Editing" : "Live preview"}
          </span>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <span
                aria-hidden="true"
                className="grid size-10 shrink-0 place-items-center rounded-full border border-border bg-secondary font-serif text-base text-primary">
                {initials || "?"}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{name}</p>
                <p className={cn("text-xs", subtleText)}>Career profile</p>
              </div>
            </div>

            <AnimatePresence>
              {complete ? (
                <motion.span
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, scale: 0.85, rotate: -10 }
                  }
                  animate={{ opacity: 1, scale: 1, rotate: -3 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 340, damping: 22 }
                  }
                  className="mt-0.5 shrink-0 rounded border border-primary/50 px-1.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
                  Ready
                </motion.span>
              ) : null}
            </AnimatePresence>
          </div>

          <dl className="mt-4 divide-y divide-border/70 border-y border-border/70">
            <FileRow
              label="Education"
              empty={!values.education}>
              {getOptionLabel(educationList, values.education) || "Not yet"}
            </FileRow>
            <FileRow
              label="Role"
              empty={!values.currentRole}>
              {values.currentRole || "Not yet"}
            </FileRow>
            <FileRow
              label="Stage"
              empty={!values.careerStage}>
              {values.careerStage || "Not yet"}
            </FileRow>
            <FileRow
              label="Experience"
              empty={!values.experience}>
              {experienceLabel(values.experience) || "Not yet"}
            </FileRow>
            <FileRow
              label="Industry"
              empty={!values.industry}>
              {values.industry || "Not yet"}
            </FileRow>
            <FileRow
              label="Location"
              empty={!values.location}>
              {values.location || "Not yet"}
            </FileRow>
            <FileRow
              label="Skills"
              empty={skills.length === 0}>
              {skills.length > 0 ? (
                <ValueChips items={skills} />
              ) : (
                "Not yet"
              )}
            </FileRow>
            <FileRow
              label="Interests"
              empty={interests.length === 0}>
              {interests.length > 0 ? (
                <ValueChips items={interests} />
              ) : (
                "Optional"
              )}
            </FileRow>
          </dl>

          <div className="mt-4">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.09em]">
              <span
                className={cn(
                  "font-medium",
                  complete ? "text-primary" : subtleText
                )}>
                {complete ? "File complete" : `${filled} of 7 answers`}
              </span>
              <span className={cn("tabular-nums", subtleText)}>
                {Math.round((filled / requiredFields.length) * 100)}%
              </span>
            </div>
            <div
              role="progressbar"
              aria-label="Profile completion"
              aria-valuemin={0}
              aria-valuemax={requiredFields.length}
              aria-valuenow={filled}
              className="mt-2 h-1 overflow-hidden rounded-full bg-input/50">
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out"
                style={{ width: `${(filled / requiredFields.length) * 100}%` }}
              />
            </div>
            <p className={cn("mt-3 text-xs leading-5", subtleText)}>
              {complete
                ? "This is the context your next conversation starts from."
                : "Your file fills in as you go."}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
