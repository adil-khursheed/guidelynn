import React, { Suspense } from "react";
import SectionContainer from "../_components/section-container";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ForgotPasswordForm from "./_components/forgot-password-form";
import { ArrowLeftIcon, FingerprintIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  return (
    <SectionContainer>
      <Card className="max-w-lg w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex flex-col items-start gap-2">
            <div className="border border-input size-10 rounded-md grid place-items-center">
              <FingerprintIcon />
            </div>
            <span>Forgot Password?</span>
          </CardTitle>
          <CardDescription className="text-lg">
            No worries, we&apos;ll send you reset instructions.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Suspense fallback={null}>
            <ForgotPasswordForm />
          </Suspense>
        </CardContent>

        <CardFooter className="flex items-center justify-center">
          <Button
            type="button"
            asChild
            variant={"link"}
            className="px-0 py-0 h-auto">
            <Link href={"/login"}>
              <ArrowLeftIcon />
              <span>Back to login</span>
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </SectionContainer>
  );
};

export default Page;
