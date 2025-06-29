import { boolean, date, index, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

const createdAt = timestamp('created_at', { withTimezone: true }).notNull().defaultNow();
const updatedAt = timestamp('updated_at', { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date());

export const Tasks = pgTable('tasks', {
    id: uuid('id').primaryKey().defaultRandom(),
    clerkUserId: text('created_by').notNull(),
    title: varchar('title', { length: 50 }).notNull(),
    description: varchar('description', { length: 255 }).notNull(),
    completed: boolean('completed').notNull().default(false),
    priority: varchar('priority', { length: 10 }).notNull(),
    dueDate: date('due_date').notNull(),
    assignedTo: text('assigned_to').notNull(),
    createdAt,
    updatedAt
}, table => [
    index("tasks.assigned_to_index").on(
        table.assignedTo
    ),
])