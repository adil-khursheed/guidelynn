import React, { Suspense } from "react";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ThemeToggle from "@/components/ui/theme-toggle";
import ProfileForm from "./_components/profile-form";

export const dynamic = "force-dynamic";

const Page = async () => {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <section className="min-h-screen flex flex-col p-3">
      <header className="sm:px-3 flex items-center justify-between">
        <h1 className="text-lg sm:text-2xl font-bold font-serif text-primary">
          Guidelynn
        </h1>

        <ThemeToggle />
      </header>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full">
          <Card className="max-w-xl w-full mx-auto">
            <CardHeader>
              <CardTitle>Tell us Something about yourself</CardTitle>
              <CardDescription>
                It will help us personalize the responses according to your
                needs.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Suspense>
                <ProfileForm />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Page;
