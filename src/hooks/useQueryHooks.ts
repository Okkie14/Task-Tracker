import { fetchUsers } from "@/app/api";
import { Tasks } from "@/drizzle/schema";
import { getAllTask, createTask, updateTask, deleteTask, updateTaskCompleted } from "@/server/db/tasks";
import { Task } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetClerkUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: () => fetchUsers(),
        staleTime: 1000 * 60 * 30,
    })
}

export const useGetAllTasks = () => {
    return useQuery<Task[]>({
        queryKey: ['tasks'],
        queryFn: () => getAllTask()
    })
}

export const useCreateNewTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: typeof Tasks.$inferInsert) => createTask({data}),
        onSuccess: () => {
            // Invalidate or refetch tasks list after creation
            queryClient.invalidateQueries({ queryKey:["tasks"]});
        },
    });
}

export const useUpdateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, updates }: { id: string; updates: Partial<typeof Tasks.$inferSelect> }) => updateTask(id, updates),
        onSuccess: () => {
            // Invalidate or refetch tasks list after creation
            queryClient.invalidateQueries({ queryKey:["tasks"]});
        },
    });
}

export const useDeleteTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteTask(id),
        onSuccess: () => {
            // Invalidate or refetch tasks list after creation
            queryClient.invalidateQueries({ queryKey:["tasks"]});
        },
    });
}

export function useUpdateTaskCompleted() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, completed }: { id: string; completed: boolean }) =>
        updateTaskCompleted(id, completed),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
});
}