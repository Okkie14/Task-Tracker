import { toast } from "sonner";
import { UseMutateFunction } from "@tanstack/react-query";
import { useState } from "react";
import { Task } from "@/types";

export function useToggleTaskCompleted(task: Task, updateCompleted: UseMutateFunction<any, any, { id: string; completed: boolean }, unknown>) {
    const [localCompleted, setLocalCompleted] = useState(task.completed);

    const toggleCompleted = () => {
        setLocalCompleted(!localCompleted); // Optimistic update
    
        updateCompleted(
            { id: task.id, completed: !localCompleted },
            {
            onSuccess: () => {
                toast.success(`${task.title} updated successfully`);
                setLocalCompleted(localCompleted);
            },
            onError: () => {
                toast.error("Error updating task");
                setLocalCompleted(!localCompleted);
            },
        });
    };

    return { localCompleted, toggleCompleted };
}

export const handleDeleteTask = (mutateAsync: UseMutateFunction<any, any, string, unknown>, id: string, taskTitle: string) => {
    mutateAsync(id, {
        onSuccess: () => {
            toast.success(`${taskTitle} deleted successfully`);
        },
        onError: () => {
            toast.error("Error deleting task");
        },
    });
};