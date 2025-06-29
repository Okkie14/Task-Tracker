import { CreateFormData } from "@/types"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "@/schema";

export const useCreateTaskForm = () => {
    return useForm<CreateFormData>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: "",
            description: "",
            priority: "medium",
            dueDate: "",
            assignedTo: "",
        }
    })
}