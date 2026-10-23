import type { Metadata } from "next";
import React, { Suspense } from "react";
import { ArrowLeftIcon } from "lucide-react";

import AuthCard from "../_components/auth-card";
import { AuthLink } from "../_components/auth-link";
import ForgotPasswordForm from "./_components/forgot-password-form";

export const metadata: Metadata = {
  title: "Reset your password",
  description:
    "Request a password reset link for your Guidelynn account by email.",
  robots: { index: false, follow: true },
};

const Page = () => {
  return (
    <AuthCard
      metaLeft="Recovery"
      metaRight="Email link"
      title="Forgot password?"
      description="No worries, we'll send you reset instructions."
      footer={
        <AuthLink
          href="/login"
          className="inline-flex items-center gap-1.5">
          <ArrowLeftIcon className="size-3.5" aria-hidden="true" />
          Back to sign in
        </AuthLink>
      }>
      <Suspense fallback={null}>
        <ForgotPasswordForm />
      </Suspense>
    </AuthCard>
  );
};

export default Page;
