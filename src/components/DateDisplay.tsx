import { cn } from "@/lib/utils";
import { formatDate, getDaysUntilDue, isOverdue } from "@/utils/dateUtils";
import { Calendar } from "lucide-react";
import React from "react";

export default function DateDisplay({
	dueDate,
	completed,
	imageSize,
	shortHand,
}: {
	dueDate: string;
	completed: boolean;
	imageSize: string;
	shortHand: boolean;
}) {
	const overdue = dueDate && isOverdue(dueDate);
	const daysUntilDue = dueDate ? getDaysUntilDue(dueDate) : null;

	return (
		<div
			className={cn(
				"flex items-center",
				shortHand ? "space-x-1 text-xs" : "space-x-2"
			)}
		>
			<Calendar className={`size-${imageSize} text-muted-foreground`} />
			<span
				className={cn(
					overdue && !completed
						? "text-red-600 font-medium"
						: "text-foreground"
				)}
			>
				{formatDate(dueDate)}
			</span>
			{daysUntilDue !== null && !completed && (
				<span
					className={cn(
						shortHand
							? "ml-1 px-1.5 py-0.5 rounded text-xs font-medium"
							: "px-2 py-1 rounded text-xs font-medium",
						overdue
							? "bg-red-100 text-red-700"
							: daysUntilDue <= 3
							? "bg-orange-100 text-orange-700"
							: "bg-gray-100 text-gray-600"
					)}
				>
					{overdue
						? "Overdue"
						: `${daysUntilDue}${shortHand ? "d" : " days"} left`}
				</span>
			)}
		</div>
	);
}
