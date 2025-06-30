import { toast } from "sonner";
import { UseMutateFunction } from "@tanstack/react-query";

type ToggleCompletedProps = {
    updateCompleted: UseMutateFunction<any, any, { id: string; completed: boolean }, unknown>;
    taskId: string;
    currentCompleted: boolean;
    taskTitle: string;
};

export const toggleTaskCompleted = ({
    updateCompleted,
    taskId,
    currentCompleted,
    taskTitle,
    }: ToggleCompletedProps) => {
    updateCompleted(
        { id: taskId, completed: !currentCompleted },
        {
        onSuccess: () => {
            toast.success(`${taskTitle} updated successfully`);
        },
        onError: () => {
            toast.error("Error updating task");
        },
        }
    );
};

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