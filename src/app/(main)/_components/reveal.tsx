"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

export const Reveal = ({
  children,
  className,
  delay = 0,
  distance = 8,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
}) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial={reduceMotion ? false : { opacity: 0, y: distance }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease }}>
      {children}
    </motion.div>
  );
};
