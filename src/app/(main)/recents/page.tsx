import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/auth";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import Chats from "./_components/chats";
import ChatsLoader from "./_components/chats-loader";
import { Reveal } from "../_components/reveal";

export const dynamic = "force-dynamic";

const Page = async () => {
  const session = await getSession();
  if (!session) redirect("/login");

  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.chat.getChats.infiniteQueryOptions(
      {
        limit: 20,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    )
  );
  return (
    <section className="flex h-dvh flex-col">
      <Reveal className="mx-auto flex w-full max-w-3xl items-end justify-between gap-4 py-4 pl-14 pr-3 md:px-3">
        <div className="min-w-0">
          <h1 className="text-xl font-semibold sm:text-2xl">
            Your chat history
          </h1>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            Every session keeps its context. Pick up where you left off.
          </p>
        </div>

        <Button asChild className="shrink-0">
          <Link href={"/new"}>
            <PlusIcon />
            <span>New Chat</span>
          </Link>
        </Button>
      </Reveal>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<ChatsLoader />}>
          <Chats />
        </Suspense>
      </HydrationBoundary>
    </section>
  );
};

export default Page;
