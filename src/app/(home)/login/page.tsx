import type { Metadata } from "next";
import React, { Suspense } from "react";

import AuthCard from "../_components/auth-card";
import { AuthLink } from "../_components/auth-link";
import SignInForm from "./_components/signin-form";

export const metadata: Metadata = {
  title: "Sign in — Guidelynn",
  description: "Sign in to continue your career conversations on Guidelynn.",
};

const Page = () => {
  return (
    <AuthCard
      metaLeft="Account"
      metaRight="Sign in"
      title="Welcome back"
      description="Enter your email and password to continue."
      footer={
        <>
          {"Don't have an account? "}
          <AuthLink href="/signup">Sign up</AuthLink>
        </>
      }>
      <Suspense fallback={null}>
        <SignInForm />
      </Suspense>
    </AuthCard>
  );
};

export default Page;
