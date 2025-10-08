import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React, { Suspense } from "react";
import SignInForm from "./_components/signin-form";
import SectionContainer from "../_components/section-container";

const Page = () => {
  return (
    <SectionContainer>
      <Card className="max-w-lg w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription className="text-lg">
            Enter your credentials to login to your account.
          </CardDescription>

          <p className="text-sm text-neutral-500">
            {"Don't have an account?"}{" "}
            <Link href="/signup" className="text-primary underline">
              Sign Up
            </Link>
          </p>
        </CardHeader>

        <CardContent>
          <Suspense fallback={null}>
            <SignInForm />
          </Suspense>
        </CardContent>
      </Card>
    </SectionContainer>
  );
};

export default Page;
