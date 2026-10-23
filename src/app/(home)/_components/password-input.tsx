"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useId, useState } from "react";

const PasswordInput = ({
  className,
  id,
  ...props
}: React.ComponentProps<"input">) => {
  const [isVisible, setIsVisible] = useState(false);
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  return (
    <div className="relative">
      <Input
        {...props}
        id={inputId}
        placeholder="Enter a password"
        type={isVisible ? "text" : "password"}
        className={cn("pe-9", className)}
      />
      <button
        className="absolute inset-y-0 end-0 flex h-full w-9 cursor-pointer items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        type="button"
        onClick={toggleVisibility}
        aria-label={isVisible ? "Hide password" : "Show password"}
        aria-pressed={isVisible}
        aria-controls={inputId}>
        {isVisible ? (
          <EyeOffIcon size={16} aria-hidden="true" />
        ) : (
          <EyeIcon size={16} aria-hidden="true" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
