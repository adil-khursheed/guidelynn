import type { Metadata } from "next";
import React, { Suspense } from "react";
import { ArrowLeftIcon } from "lucide-react";

import AuthCard from "../_components/auth-card";
import { AuthLink } from "../_components/auth-link";
import ResetPasswordForm from "./_components/reset-password-form";

export const metadata: Metadata = {
  title: "Set a new password — Guidelynn",
  description: "Choose a new password for your Guidelynn account.",
};

const Page = async (props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParams = await props.searchParams;
  const token = searchParams.token as string;

  return (
    <AuthCard
      metaLeft="Recovery"
      metaRight="New password"
      title="Set new password"
      description="Choose a strong new password. It must be at least 8 characters."
      footer={
        <AuthLink
          href="/login"
          className="inline-flex items-center gap-1.5">
          <ArrowLeftIcon className="size-3.5" aria-hidden="true" />
          Back to sign in
        </AuthLink>
      }>
      <Suspense fallback={null}>
        <ResetPasswordForm token={token} />
      </Suspense>
    </AuthCard>
  );
};

export default Page;
