import { generateConversationTitle } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useCreateChat = () => {
  const router = useRouter();
  const trpc = useTRPC();

  const queryClient = useQueryClient();

  const { mutateAsync, isPending, error } = useMutation(
    trpc.chat.createNewChat.mutationOptions({
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: trpc.chat.getChats.queryKey(),
        });
        queryClient.invalidateQueries({
          queryKey: trpc.chat.getChatById.queryKey(),
        });

        router.push(`/chat/${data.id}`);
      },
      onError: (error) => {
        toast.error("Error", {
          description: error.message || "Failed to start conversation",
        });
      },
    })
  );

  const startConversation = async (message: string, chatId: string) => {
    if (!message.trim()) {
      toast.error("Error", {
        description: "Please enter a message to start the conversation",
      });
      return;
    }

    const newChat = await mutateAsync({
      title: generateConversationTitle(message),
      id: chatId,
    });

    return newChat;
  };

  return {
    startConversation,
    isPending,
    error,
  };
};
