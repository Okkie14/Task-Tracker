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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatDate, isOverdue, getDaysUntilDue } from "@/utils/dateUtils";
import { Calendar, MoreVertical } from "lucide-react";
import { useEffect, useState } from "react";

const getPriorityColor = (priority: Task["priority"]) => {
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

interface TaskCardProps {
	task: Task;
	onEdit: (task: Task) => void;
	// onDelete: (taskId: string) => void;
	onClick: (task: Task) => void;
}

export default function TaskCard({
	task,
	onEdit,
	onClick,
}: // onDelete,
TaskCardProps) {
	const overdue = task.dueDate && isOverdue(task.dueDate);
	const daysUntilDue = task.dueDate ? getDaysUntilDue(task.dueDate) : null;
	const [userName, setUserName] = useState<string>("");
	const [initials, setInitials] = useState<string>("");

	useEffect(() => {
		const fetchUser = async () => {
			if (!task.assignedTo) return;

			const cacheKey = `user_${task.assignedTo}`;
			const cached = localStorage.getItem(cacheKey);

			if (cached) {
				const parsed = JSON.parse(cached);
				setUserName(parsed.name);
				setInitials(parsed.initials);
				return;
			}

			try {
				const res = await fetch(`/api/user/${task.assignedTo}`);
				if (!res.ok) throw new Error("Network response was not ok");

				const data = await res.json();
				setUserName(data.name);
				setInitials(data.initials);

				// Cache in localStorage
				localStorage.setItem(
					cacheKey,
					JSON.stringify({
						name: data.name,
						initials: data.initials,
					})
				);
			} catch (err) {
				console.error("Error fetching user:", err);
			}
		};

		fetchUser();
	}, [task.assignedTo]);

	const handleCardClick = (e: React.MouseEvent) => {
		if ((e.target as HTMLElement).closest("[data-no-propagation]")) {
			return;
		}
		onClick(task);
	};

	return (
		<Card
			className={cn(
				"transition-all duration-200 hover:shadow-md cursor-pointer group",
				task.completed && "opacity-75",
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
								onCheckedChange={() => {}}
								className="mt-1"
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
								>
									<MoreVertical className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem onClick={() => onEdit(task)}>
									Edit Task
								</DropdownMenuItem>
								<DropdownMenuItem className="text-red-600">
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
						<div className="flex items-center space-x-2">
							<Avatar className="h-6 w-6">
								<AvatarFallback className="text-xs">
									{initials ||
										task.assignedTo
											.substring(0, 2)
											.toUpperCase()}
								</AvatarFallback>
							</Avatar>
							{userName && <span>{userName}</span>}
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
