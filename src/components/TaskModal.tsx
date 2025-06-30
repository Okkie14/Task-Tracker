"use client";
import { useState, useEffect } from "react";
import { Task, CreateFormData } from "@/types";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

import {
	useCreateNewTask,
	useGetClerkUsers,
	useUpdateTask,
} from "@/hooks/useQueryHooks";
import { useCreateTaskForm } from "@/hooks/useForm";
import { useUser } from "@clerk/nextjs";
import TaskForm from "./forms/TaskForm";
import { toast } from "sonner";

type TaskModalProps = {
	isOpen: boolean;
	onClose: () => void;
	isEdit: boolean;
	task?: Task;
	// users: User[];
};

export default function TaskModal({
	isOpen,
	onClose,
	isEdit,
	task,
}: // users,
TaskModalProps) {
	const { mutateAsync } = useCreateNewTask();
	const { mutateAsync: mutateUpdate } = useUpdateTask();
	const user = useUser();
	const clerkUserId = user.user?.id;

	const handleSaveTask = (taskData: CreateFormData) => {
		if (!isEdit) {
			const newData = {
				...taskData,
				clerkUserId: clerkUserId ?? "",
				completed: false,
			};
			mutateAsync(newData);
		} else if (isEdit) {
			if (!task) {
				toast.warning("Task not found");
				return;
			}
			mutateUpdate({ id: task.id, updates: taskData });
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>
						{task ? "Edit Task" : "Create New Task"}
					</DialogTitle>
				</DialogHeader>
				<TaskForm
					isOpen={isOpen}
					onClose={onClose}
					onSave={handleSaveTask}
					task={task}
				/>
			</DialogContent>
		</Dialog>
	);
}
