import { MemoryClient, Message } from "mem0ai";

export const memoryClient = new MemoryClient({
  apiKey: process.env.MEM0_API_KEY as string,
});

export async function addMemory(
  userId: string,
  chatId: string,
  messages: Message[]
) {
  try {
    const result = await memoryClient.add(messages, {
      user_id: userId,
      run_id: chatId,
    });

    return result;
  } catch (error) {
    console.error("Error adding memory:", error);
    throw new Error("Failed to add memory");
  }
}

export async function searchMemories(
  userId: string,
  chatId: string,
  query: string,
  limit = 10
) {
  try {
    const result = await memoryClient.search(query, {
      user_id: userId,
      run_id: chatId,
      limit,
    });

    return result;
  } catch (error) {
    console.error("Error searching memory:", error);
    throw new Error("Failed to search memory");
  }
}

export async function getMemories(userId: string) {
  try {
    const result = await memoryClient.getAll({
      user_id: userId,
    });

    return result;
  } catch (error) {
    console.error("Error getting memories:", error);
    throw new Error("Failed to get memories");
  }
}

export async function deleteMemories(userId: string, chatId: string) {
  try {
    const result = await memoryClient.deleteAll({
      user_id: userId,
      run_id: chatId,
    });

    return result;
  } catch (error) {
    console.error("Error getting memories:", error);
    throw new Error("Failed to delete memories");
  }
}
