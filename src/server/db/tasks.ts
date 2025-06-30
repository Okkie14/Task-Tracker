'use server'

import { db } from "@/drizzle/db";
import { Tasks } from "@/drizzle/schema";
import { and, eq, sql, lt, gte } from "drizzle-orm";

export async function createTask({ data }: { data: typeof Tasks.$inferInsert }) {
    const result = await db.insert(Tasks).values(data)
    // Return only the inserted row (plain JS object)
    return result.rows[0]
  }

export async function updateTask(id: string, updates: Partial<typeof Tasks.$inferSelect>) {
  try {
    const result = await db
      .update(Tasks)
      .set({
        ...updates,
        updatedAt: new Date(), // update timestamp
      })
      .where(eq(Tasks.id, id))
      .returning();

    return result; // returns updated rows
  } catch (error) {
    console.error("Failed to update task:", error);
    throw error;
  }
}


export async function deleteTask(id: string) {
  try {
    await db
      .delete(Tasks)
      .where(eq(Tasks.id, id));
    // Optionally return something or just void
  } catch (error) {
    console.error("Failed to delete task:", error);
    throw error;
  }
}

export async function getTasks(userId: string) {
    const tasks = await db.select().from(Tasks).where(eq(Tasks.clerkUserId, userId));

    return tasks
}

export async function getAllTask() {
    const tasks = await db.select().from(Tasks);

    return tasks
}

export async function updateTaskCompleted(id: string, completed: boolean) {
  try {
    const result = await db
      .update(Tasks)
      .set({ completed, updatedAt: new Date() })
      .where(eq(Tasks.id, id))
      .returning();

    return result;
  } catch (error) {
    console.error("Failed to update task completion:", error);
    throw error;
  }
}