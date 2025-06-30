import { Task } from "@/types";

export const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
        case "high":
            return "bg-red-100 text-red-800 border-red-200";
        case "medium":
            return "bg-orange-100 text-orange-800 border-orange-200";
        case "low":
            return "bg-blue-100 text-blue-800 border-blue-200";
        default:
            return "bg-gray-100 text-gray-800 border-gray-200";
    }
};