"use client";

import type { Task } from "@/types";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { isOverdue } from "@/utils/dateUtils";
import { MoreVertical } from "lucide-react";
import { useDeleteTask, useUpdateTaskCompleted } from "@/hooks/useQueryHooks";
import UserAvatar from "./UserAvatar";
import LoadingCards from "./LoadingCards";
import ErrorCard from "./ErrorCard";
import { handleDeleteTask, toggleTaskCompleted } from "@/utils/taskUtils";
import PriorityBadge from "./PriorityBadge";
import DateDisplay from "./DateDisplay";

interface TaskCardProps {
	task: Task;
	onEdit: (task: Task) => void;
	onClick: (task: Task) => void;
	isLoading: boolean;
	isFetching: boolean;
	isError: boolean;
	message?: string;
}

export default function TaskCard({
	task,
	onEdit,
	onClick,
	isLoading,
	isFetching,
	isError,
	message,
}: TaskCardProps) {
	const { mutateAsync } = useDeleteTask();
	const { mutate: updateCompleted } = useUpdateTaskCompleted();
	const overdue = task.dueDate && isOverdue(task.dueDate);

	const handleCardClick = (e: React.MouseEvent) => {
		if ((e.target as HTMLElement).closest("[data-no-propagation]")) {
			return;
		}
		onClick(task);
	};

	const toggleCompleted = (taskId: string, currentCompleted: boolean) => {
		toggleTaskCompleted({
			updateCompleted,
			taskId,
			currentCompleted,
			taskTitle: task.title,
		});
	};

	const handleDelete = (id: string) => {
		handleDeleteTask(mutateAsync, id, task.title);
	};

	if (isLoading || isFetching) {
		return (
			<LoadingCards
				skeletonClass="h-48 w-full" // or a fixed width like w-64
				total={1}
			/>
		);
	}

	if (isError) return <ErrorCard message={message} />;

	return (
		<Card
			className={cn(
				"transition-all duration-200 hover:shadow-md cursor-pointer group h-48",
				task.completed && "opacity-50",
				overdue && !task.completed && "border-red-300 bg-red-50/30"
			)}
			onClick={handleCardClick}
		>
			<CardHeader className="pb-3">
				<div className="flex items-start justify-between">
					<div className="flex items-start space-x-3 flex-1">
						<div data-no-propagation>
							<Checkbox
								checked={task.completed}
								onCheckedChange={() =>
									toggleCompleted(task.id, task.completed)
								}
								className="mt-1 hover:cursor-pointer"
							/>
						</div>
						<div className="flex-1 min-w-0">
							<h3
								className={cn(
									"font-semibold text-lg leading-tight",
									task.completed &&
										"line-through text-muted-foreground"
								)}
							>
								{task.title}
							</h3>
							<p className="text-sm text-muted-foreground mt-1 line-clamp-2 whitespace-pre-line">
								{task.description}
							</p>
						</div>
					</div>
					<div data-no-propagation>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									size="sm"
									className="opacity-0 group-hover:opacity-100 transition-opacity"
									disabled={task.completed}
								>
									<MoreVertical className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem
									onClick={(e) => {
										e.stopPropagation();
										onEdit(task);
									}}
								>
									Edit Task
								</DropdownMenuItem>
								<DropdownMenuItem
									className="text-red-600"
									onClick={(e) => {
										e.stopPropagation();
										handleDelete(task.id);
									}}
								>
									Delete Task
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</CardHeader>

			<CardContent className="mt-auto">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-4">
						<PriorityBadge priority={task.priority} />

						{task.dueDate && (
							<DateDisplay
								dueDate={task.dueDate}
								completed={task.completed}
								imageSize="3"
								shortHand={true}
							/>
						)}
					</div>

					{task.assignedTo && (
						<UserAvatar assignedTo={task.assignedTo} />
					)}
				</div>
			</CardContent>
		</Card>
	);
}
