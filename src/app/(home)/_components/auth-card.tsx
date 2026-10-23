import React from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import SectionContainer from "./section-container";

const AuthCard = ({
  metaLeft,
  metaRight,
  title,
  description,
  footer,
  children,
}: {
  metaLeft: string;
  metaRight: string;
  title: string;
  description?: string;
  footer: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <SectionContainer>
      <Card className="w-full max-w-lg gap-0 overflow-hidden py-0 shadow-sm">
        <div className="flex h-11 items-center justify-between gap-4 border-b border-border px-5 text-[10px] uppercase tracking-[0.09em] sm:px-7">
          <div className="flex items-center gap-2.5">
            <span className="size-1.5 rounded-full bg-primary" />
            <span className="font-semibold text-foreground">{metaLeft}</span>
          </div>
          <span className="text-secondary-foreground dark:text-muted-foreground">
            {metaRight}
          </span>
        </div>

        <CardHeader className="gap-2 px-5 pb-0 pt-7 sm:px-7">
          <h1 className="text-balance text-2xl font-semibold leading-tight tracking-[-0.01em]">
            {title}
          </h1>
          {description ? (
            <p className="text-pretty text-[15px] leading-6 text-secondary-foreground dark:text-muted-foreground">
              {description}
            </p>
          ) : null}
        </CardHeader>

        <CardContent className="px-5 pb-7 pt-6 sm:px-7">{children}</CardContent>

        <div className="border-t border-border bg-muted/30 px-5 py-3.5 text-sm text-secondary-foreground dark:text-muted-foreground sm:px-7">
          {footer}
        </div>
      </Card>
    </SectionContainer>
  );
};

export default AuthCard;
