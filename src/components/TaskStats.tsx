"use client";

import { Card, CardHeader, CardTitle } from "./ui/card";
import { memo } from "react";
import { Task } from "@/types";
import { Skeleton } from "./ui/skeleton";

function TaskStats({ filteredTasks }: { filteredTasks: Task[] | undefined }) {
	const totalTasks = filteredTasks?.length;
	const completed = filteredTasks?.filter((task) => task.completed).length;

	const now = new Date();
	now.setHours(0, 0, 0, 0);

	// Pending: not completed and due today or in the future
	const pending = filteredTasks?.filter((task) => {
		if (task.completed) return false;

		const dueDate = new Date(task.dueDate);
		dueDate.setHours(0, 0, 0, 0);

		// Due today or in the future
		return dueDate >= now;
	}).length;

	const overdue = filteredTasks?.filter((task) => {
		if (task.completed) return false;

		const dueDate = new Date(task.dueDate);
		dueDate.setHours(0, 0, 0, 0);

		// Due before today
		return dueDate < now;
	}).length;

	return (
		<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
			<Card className="bg-blue-50 border border-blue-200">
				<CardHeader className="text-center">
					<CardTitle className="text-sm text-blue-600">
						Total Tasks
					</CardTitle>

					{totalTasks === undefined ? (
						<Skeleton className="h-8 w-6 mx-auto bg-blue-700" />
					) : (
						<p className="text-2xl font-bold text-blue-700">
							{totalTasks}
						</p>
					)}
				</CardHeader>
			</Card>
			<Card className="bg-green-50 border border-green-200">
				<CardHeader className="text-center">
					<CardTitle className="text-sm text-green-600">
						Completed
					</CardTitle>
					{completed === undefined ? (
						<Skeleton className="h-8 w-6 mx-auto bg-green-700" />
					) : (
						<p className="text-2xl font-bold text-green-700">
							{completed}
						</p>
					)}
				</CardHeader>
			</Card>
			<Card className="bg-orange-50 border border-orange-200">
				<CardHeader className="text-center">
					<CardTitle className="text-sm text-orange-600">
						Pending
					</CardTitle>
					{pending === undefined ? (
						<Skeleton className="h-8 w-6 mx-auto bg-orange-700" />
					) : (
						<p className="text-2xl font-bold text-orange-700">
							{pending}
						</p>
					)}
				</CardHeader>
			</Card>
			<Card className="bg-red-50 border border-red-200">
				<CardHeader className="text-center">
					<CardTitle className="text-sm text-red-600">
						Overdue
					</CardTitle>
					{overdue === undefined ? (
						<Skeleton className="h-8 w-6 mx-auto bg-red-700" />
					) : (
						<p className="text-2xl font-bold text-red-700">
							{overdue}
						</p>
					)}
				</CardHeader>
			</Card>
		</div>
	);
}

export default memo(TaskStats);
