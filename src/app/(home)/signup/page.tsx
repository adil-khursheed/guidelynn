import type { Metadata } from "next";
import React, { Suspense } from "react";

import AuthCard from "../_components/auth-card";
import { AuthLink } from "../_components/auth-link";
import SignUpForm from "./_components/signup-form";

export const metadata: Metadata = {
  title: "Create an account",
  description:
    "Create your Guidelynn account to keep your profile and career conversations in one place.",
  robots: { index: false, follow: true },
};

const Page = () => {
  return (
    <AuthCard
      metaLeft="Account"
      metaRight="Create account"
      title="Create a new account"
      description="One account keeps your profile and every conversation in one place."
      footer={
        <>
          {"Already have an account? "}
          <AuthLink href="/login">Sign in</AuthLink>
        </>
      }>
      <Suspense fallback={null}>
        <SignUpForm />
      </Suspense>
    </AuthCard>
  );
};

export default Page;
