import { fetchUsers } from "@/app/api";
import { Tasks } from "@/drizzle/schema";
import { getAllTask, createTask, getTaskDetails } from "@/server/db/tasks";
import { Task } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetClerkUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: () => fetchUsers()
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

export const useTaskDetails = () => {
    return useQuery({
        queryKey: ['taskDetails'],
        queryFn: () => getTaskDetails()
    })
}