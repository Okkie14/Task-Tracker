import { z } from "zod";

export const taskSchema = z.object({
    title: z.string().min(1, "Please provide a title for this task"),
    description: z.string().min(1, "Please provide a description for this task"),
    priority: z.string().min(1, "Priority is required"),
    dueDate: z.string().min(1, "Please select a date this task is due"),
    assignedTo: z.string().min(1, "Please assign task to a user"),
});

export type TaskFormData = z.infer<typeof taskSchema>;