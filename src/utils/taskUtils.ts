import { toast } from "sonner";
import { UseMutateFunction } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";

type ToggleCompletedProps = {
    updateCompleted: UseMutateFunction<any, any, { id: string; completed: boolean }, unknown>;
    taskId: string;
    currentCompleted: boolean;
    taskTitle: string;
    setLocalCompleted: Dispatch<SetStateAction<boolean>>
};

export const toggleTaskCompleted = ({
    updateCompleted,
    taskId,
    currentCompleted,
    taskTitle,
    setLocalCompleted
    }: ToggleCompletedProps) => {
        setLocalCompleted(!currentCompleted);
    updateCompleted(
        { id: taskId, completed: !currentCompleted },
        {
        onSuccess: () => {
            toast.success(`${taskTitle} updated successfully`);
            setLocalCompleted(currentCompleted);
        },
        onError: () => {
            toast.error("Error updating task");
            setLocalCompleted(!currentCompleted);
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