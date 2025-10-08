import React, { Suspense } from "react";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SignUpForm from "./_components/signup-form";
import SectionContainer from "../_components/section-container";

const Page = () => {
  return (
    <SectionContainer>
      <Card className="max-w-lg w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Create a new account
          </CardTitle>

          <p className="text-sm text-neutral-500">
            {"Already have an account?"}{" "}
            <Link href="/login" className="text-primary underline">
              Sign In
            </Link>
          </p>
        </CardHeader>

        <CardContent>
          <Suspense fallback={null}>
            <SignUpForm />
          </Suspense>
        </CardContent>
      </Card>
    </SectionContainer>
  );
};

export default Page;
