"use client";

import { Task } from "@/types";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Clock, Edit, Trash2 } from "lucide-react";
import { formatDatabaseDate } from "@/utils/dateUtils";
import { cn } from "@/lib/utils";
import UserAvatar from "./UserAvatar";
import { useDeleteTask, useUpdateTaskCompleted } from "@/hooks/useQueryHooks";
import { handleDeleteTask, toggleTaskCompleted } from "@/utils/taskUtils";
import PriorityBadge from "./PriorityBadge";
import DateDisplay from "./DateDisplay";
import { useState } from "react";

interface TaskDetailViewProps {
	isOpen: boolean;
	onClose: () => void;
	task: Task | null;
	onEdit: (task: Task) => void;
}

export default function TaskViewDetails({
	isOpen,
	onClose,
	task,
	onEdit,
}: TaskDetailViewProps) {
	if (!task) return null;

	const [localCompleted, setLocalCompleted] = useState(task.completed);
	const { mutateAsync } = useDeleteTask();
	const { mutate: updateCompleted } = useUpdateTaskCompleted();

	const handleEdit = () => {
		onEdit(task);
		onClose();
	};

	const handleDelete = () => {
		handleDeleteTask(mutateAsync, task.id, task.title);
		onClose();
	};

	const toggleCompleted = (taskId: string, currentCompleted: boolean) => {
		toggleTaskCompleted({
			updateCompleted,
			taskId,
			currentCompleted,
			taskTitle: task.title,
			setLocalCompleted,
		});
		onClose();
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[600px]">
				<DialogHeader className="mt-6">
					<div className="flex items-start justify-between">
						<div className="flex items-center space-x-3 flex-1">
							<Checkbox
								checked={localCompleted}
								onCheckedChange={() =>
									toggleCompleted(task.id, task.completed)
								}
								className="mt-1 hover:cursor-pointer"
							/>
							<div className="flex-1">
								<DialogTitle
									className={cn(
										"text-xl leading-tight",
										task.completed &&
											"line-through text-muted-foreground"
									)}
								>
									{task.title}
								</DialogTitle>
								<p
									className={
										task.completed
											? "text-green-500"
											: "text-blue-500"
									}
								>
									{task.completed
										? "Completed"
										: "Not Completed"}
								</p>
							</div>
						</div>
						<div className="flex space-x-2">
							<Button
								variant="outline"
								size="sm"
								onClick={handleEdit}
							>
								<Edit className="h-4 w-4 mr-2" />
								Edit
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={handleDelete}
								className="text-red-600 hover:text-red-700"
							>
								<Trash2 className="h-4 w-4 mr-2" />
								Delete
							</Button>
						</div>
					</div>
				</DialogHeader>

				<div className="space-y-6">
					{/* Task Info */}
					<div className="space-y-4">
						<div>
							<h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-2">
								Description
							</h4>
							<p className="text-base leading-relaxed whitespace-pre-line">
								{task.description}
							</p>
						</div>

						<div className="grid grid-cols-2 gap-6">
							<div>
								<h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-2">
									Priority
								</h4>
								<PriorityBadge priority={task.priority} />
							</div>

							{task.dueDate && (
								<div>
									<h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-2">
										Due Date
									</h4>
									<DateDisplay
										dueDate={task.dueDate}
										completed={task.completed}
										imageSize="4"
										shortHand={false}
									/>
								</div>
							)}
						</div>

						{task.assignedTo && (
							<div>
								<h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-2">
									Assigned To
								</h4>
								<UserAvatar assignedTo={task.assignedTo} />
							</div>
						)}
					</div>

					{/* Timestamps */}
					<div className="border-t pt-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
							<div className="flex items-center space-x-2">
								<Clock className="h-4 w-4" />
								<span>
									Created:{" "}
									{formatDatabaseDate(task.createdAt)}
								</span>
							</div>
							<div className="flex items-center space-x-2">
								<Clock className="h-4 w-4" />
								<span>
									Updated:{" "}
									{formatDatabaseDate(task.updatedAt)}
								</span>
							</div>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
