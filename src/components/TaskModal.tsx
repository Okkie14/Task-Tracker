"use client";
import { Task, CreateFormData } from "@/types";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useCreateNewTask, useUpdateTask } from "@/hooks/useQueryHooks";
import { useUser } from "@clerk/nextjs";
import TaskForm from "./forms/TaskForm";
import { toast } from "sonner";

type TaskModalProps = {
	isOpen: boolean;
	onClose: () => void;
	isEdit: boolean;
	task?: Task;
};

export default function TaskModal({
	isOpen,
	onClose,
	isEdit,
	task,
}: TaskModalProps) {
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
			mutateAsync(newData, {
				onSuccess: () => {
					toast.success(`${taskData.title} created successfully`);
				},
				onError: () => {
					toast.error("Error creating task");
				},
			});
		} else if (isEdit) {
			if (!task) {
				toast.warning("Task not found");
				return;
			}
			mutateUpdate(
				{ id: task.id, updates: taskData },
				{
					onSuccess: () => {
						toast.success(`${taskData.title} updated successfully`);
					},
					onError: () => {
						toast.error("Error updating task");
					},
				}
			);
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
