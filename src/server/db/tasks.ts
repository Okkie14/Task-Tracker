'use server'

import { db } from "@/drizzle/db";
import { Tasks } from "@/drizzle/schema";
import { and, eq, sql } from "drizzle-orm";

export async function createTask() {

}

export async function updateTask() {

}

export async function deleteTask() {

}

export async function getTasks(userId: string) {
    const tasks = await db.select().from(Tasks).where(eq(Tasks.clerkUserId, userId));

    return tasks
}

export async function getAllTask() {
    const tasks = await db.select().from(Tasks);

    return tasks
}

