import { getAllTask } from "@/server/db/tasks";
import { useQuery } from "@tanstack/react-query";

export const useGetAllTasks = () => {
    return useQuery({
        queryKey: ['tasks'],
        queryFn: () => getAllTask()
    })
}