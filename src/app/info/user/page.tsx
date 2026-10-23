import type { Metadata } from "next";
import React, { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { ArrowLeft } from "lucide-react";

import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ThemeToggle from "@/components/ui/theme-toggle";

import ProfileForm from "./_components/profile-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your career profile",
  description:
    "Three short notes about where you are, what you bring, and where you're headed — so every career conversation starts from your real context.",
  robots: { index: false, follow: false },
};

const ProfileSkeleton = () => (
  <div className="mx-auto grid w-full max-w-245 gap-6 lg:grid-cols-[minmax(0,576px)_320px] lg:items-start lg:gap-8">
    <div className="space-y-4">
      <div className="h-110 animate-pulse rounded-xl border border-border bg-card" />
      <div className="h-4 w-64 animate-pulse rounded bg-muted" />
    </div>
    <div className="hidden h-80 animate-pulse rounded-xl border border-border bg-card lg:block" />
  </div>
);

const Page = async () => {
  const session = await getSession();
  if (!session) redirect("/login");

  const profile = await prisma.userProfile.findUnique({
    where: { userId: session.user.id },
  });

  return (
    <section className="flex min-h-dvh flex-col">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-60 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:ring-2 focus:ring-ring">
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-border bg-background">
        <div className="mx-auto flex h-16 w-full max-w-265 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="rounded-sm font-serif text-xl tracking-[-0.02em] text-primary focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50">
              Guidelynn
            </Link>

            {profile ? (
              <Link
                href="/new"
                className="inline-flex items-center gap-1.5 rounded-sm text-xs font-medium text-secondary-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 dark:text-muted-foreground">
                <ArrowLeft className="size-3.5" aria-hidden="true" />
                Back to chats
              </Link>
            ) : null}
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden text-[10px] uppercase tracking-[0.09em] text-secondary-foreground dark:text-muted-foreground sm:inline">
              Career profile
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main id="content" className="flex-1 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Suspense fallback={<ProfileSkeleton />}>
          <ProfileForm
            name={session.user.name}
            isEditing={Boolean(profile)}
            initialValues={{
              currentRole: profile?.currentRole ?? "",
              experience: profile?.experience ?? "",
              industry: profile?.industry ?? "",
              skills: profile?.skills ?? [],
              interests: profile?.interests ?? [],
              education: profile?.education ?? "",
              location: profile?.location ?? "",
              careerStage: profile?.careerStage ?? "",
            }}
          />
        </Suspense>
      </main>
    </section>
  );
};

export default Page;
