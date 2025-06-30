"use client";

import type { Task } from "@/types";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatDate, isOverdue, getDaysUntilDue } from "@/utils/dateUtils";
import { Calendar, MoreVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { useDeleteTask, useUpdateTaskCompleted } from "@/hooks/useQueryHooks";
import { getPriorityColor } from "@/utils/getPriorityColors";
import UserAvatar from "./UserAvatar";

interface TaskCardProps {
	task: Task;
	onEdit: (task: Task) => void;
	onClick: (task: Task) => void;
}

export default function TaskCard({ task, onEdit, onClick }: TaskCardProps) {
	const { mutateAsync } = useDeleteTask();
	const { mutate: updateCompleted } = useUpdateTaskCompleted();
	const overdue = task.dueDate && isOverdue(task.dueDate);
	const daysUntilDue = task.dueDate ? getDaysUntilDue(task.dueDate) : null;

	const handleCardClick = (e: React.MouseEvent) => {
		if ((e.target as HTMLElement).closest("[data-no-propagation]")) {
			return;
		}
		onClick(task);
	};

	const toggleCompleted = (taskId: string, currentCompleted: boolean) => {
		updateCompleted({ id: taskId, completed: !currentCompleted });
	};

	return (
		<Card
			className={cn(
				"transition-all duration-200 hover:shadow-md cursor-pointer group",
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
							<p className="text-sm text-muted-foreground mt-1 line-clamp-2">
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
								<DropdownMenuItem onClick={() => onEdit(task)}>
									Edit Task
								</DropdownMenuItem>
								<DropdownMenuItem
									className="text-red-600"
									onClick={() => mutateAsync(task.id)}
								>
									Delete Task
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</CardHeader>

			<CardContent className="pt-0">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-4">
						<Badge
							variant="outline"
							className={getPriorityColor(task.priority)}
						>
							{task.priority}
						</Badge>

						{task.dueDate && (
							<div
								className={cn(
									"flex items-center space-x-1 text-xs",
									overdue && !task.completed
										? "text-red-600"
										: "text-muted-foreground"
								)}
							>
								<Calendar className="h-3 w-3" />
								<span>{formatDate(task.dueDate)}</span>
								{daysUntilDue !== null && !task.completed && (
									<span
										className={cn(
											"ml-1 px-1.5 py-0.5 rounded text-xs font-medium",
											overdue
												? "bg-red-100 text-red-700"
												: daysUntilDue <= 3
												? "bg-orange-100 text-orange-700"
												: "bg-gray-100 text-gray-600"
										)}
									>
										{overdue
											? "Overdue"
											: `${daysUntilDue}d left`}
									</span>
								)}
							</div>
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
