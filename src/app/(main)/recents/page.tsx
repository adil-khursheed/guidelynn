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
    <section className="h-dvh flex flex-col">
      <div className="max-w-3xl w-full mx-auto px-3 py-4 flex items-center justify-between">
        <h3 className="text-xl sm:text-2xl font-semibold">Your chat history</h3>

        <Button asChild>
          <Link href={"/new"}>
            <PlusIcon />
            <span>New Chat</span>
          </Link>
        </Button>
      </div>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<ChatsLoader />}>
          <Chats />
        </Suspense>
      </HydrationBoundary>
    </section>
  );
};

export default Page;
