"use client";

import * as React from "react";
import { Check, Plus, X } from "lucide-react";

import { cn, capitalizeFirstLetter } from "@/lib/utils";

import type { ProfileOption } from "./profile-options";

type ChipPickerProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "onKeyDown"
> & {
  options: ProfileOption[];
  value: string[];
  onValueChange: (value: string[]) => void;
  placeholder?: string;
  invalid?: boolean;
};

export const ChipPicker = ({
  options,
  value,
  onValueChange,
  placeholder = "Add your own",
  invalid,
  className,
  ...inputProps
}: ChipPickerProps) => {
  const [draft, setDraft] = React.useState("");
  const selected = value ?? [];
  const isDisabled = Boolean(inputProps.disabled);

  const labelFor = (item: string) => {
    const option = options.find(
      (candidate) => candidate.value.toLowerCase() === item.toLowerCase()
    );
    return option?.label ?? capitalizeFirstLetter(item);
  };

  const addItem = (raw: string) => {
    if (isDisabled) return;
    const trimmed = raw.trim();
    if (!trimmed) return;

    const normalized = trimmed.toLowerCase();
    const exists = selected.some(
      (item) =>
        item.toLowerCase() === normalized ||
        labelFor(item).toLowerCase() === normalized
    );

    if (!exists) {
      onValueChange([...selected, normalized]);
    }
    setDraft("");
  };

  const removeItem = (item: string) => {
    if (isDisabled) return;
    onValueChange(selected.filter((candidate) => candidate !== item));
  };

  const suggestions = options.filter(
    (option) =>
      !selected.some(
        (item) => item.toLowerCase() === option.value.toLowerCase()
      )
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addItem(draft);
    }

    if (event.key === "Backspace" && !draft && selected.length > 0) {
      removeItem(selected[selected.length - 1]);
    }
  };

  return (
    <div>
      <div
        className={cn(
          "rounded-md border border-input bg-transparent p-1.5 shadow-xs transition-[color,box-shadow] focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 dark:bg-input/30",
          invalid &&
            "border-destructive focus-within:border-destructive focus-within:ring-destructive/20",
          className
        )}>
        {selected.length > 0 ? (
          <ul className="flex flex-wrap gap-1.5 p-0.5" aria-label="Selected">
            {selected.map((item) => (
              <li key={item}>
                <span className="inline-flex h-6 items-center gap-1 rounded border border-primary/30 bg-primary/5 pl-2 pr-1 text-[11px] font-medium">
                  {labelFor(item)}
                  <button
                    type="button"
                    onClick={() => removeItem(item)}
                    aria-label={`Remove ${labelFor(item)}`}
                    disabled={isDisabled}
                    className="grid size-4 place-items-center rounded-sm text-muted-foreground transition-colors hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <X className="size-3" />
                  </button>
                </span>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="flex items-center gap-2 px-1.5">
          <input
            {...inputProps}
            value={draft}
            maxLength={40}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="h-8 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-secondary-foreground/90 dark:placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          />
          {draft.trim() ? (
            <button
              type="button"
              onClick={() => addItem(draft)}
              disabled={isDisabled}
              className="shrink-0 rounded px-1 text-xs font-medium text-primary transition-colors disabled:cursor-not-allowed disabled:opacity-50 hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              Add
            </button>
          ) : null}
        </div>
      </div>

      {suggestions.length > 0 ? (
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {suggestions.map((option) => (
            <button
              type="button"
              key={option.value}
              onClick={() => addItem(option.value)}
              disabled={isDisabled}
              className="inline-flex h-6 items-center gap-1 rounded border border-dashed border-border px-1.5 text-[11px] text-secondary-foreground transition-colors disabled:cursor-not-allowed disabled:opacity-50 dark:text-muted-foreground hover:border-primary/40 hover:bg-muted/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <Plus className="size-3" />
              {option.label}
            </button>
          ))}
        </div>
      ) : null}

      <p className="mt-2 flex items-center gap-1.5 text-xs text-secondary-foreground dark:text-muted-foreground">
        <Check className="size-3 text-primary" />
        Press Enter to add your own. Backspace removes the last one.
      </p>
    </div>
  );
};
