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
import { ArrowLeftIcon, LockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ResetPasswordForm from "./_components/reset-password-form";

const Page = async (props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParams = await props.searchParams;
  const token = searchParams.token as string;

  return (
    <SectionContainer>
      <Card className="max-w-lg w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex flex-col items-start gap-2">
            <div className="border border-input size-10 rounded-md grid place-items-center">
              <LockIcon />
            </div>
            <span>Set new password</span>
          </CardTitle>
          <CardDescription className="text-lg">
            Must be at least 8 characters.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Suspense fallback={null}>
            <ResetPasswordForm token={token} />
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
