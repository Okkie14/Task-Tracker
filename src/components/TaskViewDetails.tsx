import { Task } from "@/types";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Clock, User, Edit, Trash2 } from "lucide-react";
import {
	formatDate,
	isOverdue,
	getDaysUntilDue,
	formatDatabaseDate,
} from "@/utils/dateUtils";
import { cn } from "@/lib/utils";
import { getPriorityColor } from "@/utils/getPriorityColors";
import UserAvatar from "./UserAvatar";
import { useDeleteTask, useUpdateTaskCompleted } from "@/hooks/useQueryHooks";

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
	const { mutateAsync } = useDeleteTask();
	const { mutate: updateCompleted } = useUpdateTaskCompleted();
	if (!task) return null;
	const overdue = task.dueDate && isOverdue(task.dueDate);
	const daysUntilDue = task.dueDate ? getDaysUntilDue(task.dueDate) : null;

	const handleEdit = () => {
		onEdit(task);
		onClose();
	};

	const handleDelete = () => {
		mutateAsync(task.id);
		onClose();
	};

	const toggleCompleted = (taskId: string, currentCompleted: boolean) => {
		updateCompleted({ id: taskId, completed: !currentCompleted });
		onClose();
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[600px]">
				<DialogHeader className="mt-6">
					<div className="flex items-start justify-between">
						<div className="flex items-center space-x-3 flex-1">
							<Checkbox
								checked={task.completed}
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
							<p className="text-base leading-relaxed">
								{task.description}
							</p>
						</div>

						<div className="grid grid-cols-2 gap-6">
							<div>
								<h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-2">
									Priority
								</h4>
								<Badge
									variant="outline"
									className={getPriorityColor(task.priority)}
								>
									{task.priority}
								</Badge>
							</div>

							{task.dueDate && (
								<div>
									<h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-2">
										Due Date
									</h4>
									<div className="flex items-center space-x-2">
										<Calendar className="h-4 w-4 text-muted-foreground" />
										<span
											className={cn(
												overdue && !task.completed
													? "text-red-600 font-medium"
													: "text-foreground"
											)}
										>
											{formatDate(task.dueDate)}
										</span>
										{daysUntilDue !== null &&
											!task.completed && (
												<span
													className={cn(
														"px-2 py-1 rounded text-xs font-medium",
														overdue
															? "bg-red-100 text-red-700"
															: daysUntilDue <= 3
															? "bg-orange-100 text-orange-700"
															: "bg-gray-100 text-gray-600"
													)}
												>
													{overdue
														? "Overdue"
														: `${daysUntilDue} days left`}
												</span>
											)}
									</div>
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
