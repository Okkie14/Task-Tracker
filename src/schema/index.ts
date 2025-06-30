import { z } from "zod";

export const taskSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    priority: z.string().min(1, "Priority is required"),
    dueDate: z.string(),
    assignedTo: z.string(),
});

export type TaskFormData = z.infer<typeof taskSchema>;