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

export async function getTaskDetails() {
    const now = new Date();
    const nowString = now.toISOString().split('T')[0];
  
    // Total tasks count
    const totalTasksQuery = db.select({ count: sql<number>`count(*)` }).from(Tasks);
  
    // Completed tasks count
    const completedTasksQuery = db
      .select({ count: sql<number>`count(*)` })
      .from(Tasks)
      .where(eq(Tasks.completed, true));
  
    // Overdue tasks count (dueDate < now AND not completed)
    const overdueTasksQuery = db
    .select({ count: sql<number>`count(*)` })
    .from(Tasks)
    .where(
        and(
            lt(Tasks.dueDate, nowString),
            eq(Tasks.completed, false)
        )
    );

  
    // Pending tasks count (not completed AND dueDate >= now)
    const pendingTasksQuery = db
        .select({ count: sql<number>`count(*)` })
        .from(Tasks)
        .where(
        and(
            eq(Tasks.completed, false),
            gte(Tasks.dueDate, nowString)
        )
        );
  
    // Execute all queries in parallel
    const [total, completed, overdue, pending] = await Promise.all([
      totalTasksQuery,
      completedTasksQuery,
      overdueTasksQuery,
      pendingTasksQuery,
    ]);
  
    return {
      total: total[0].count,
      completed: completed[0].count,
      overdue: overdue[0].count,
      pending: pending[0].count,
    };
  }