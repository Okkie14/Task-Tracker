import React from "react";
import { Badge } from "./ui/badge";
import { getPriorityColor } from "@/utils/getPriorityColors";

export default function PriorityBadge({ priority }: { priority: string }) {
	return (
		<Badge variant="outline" className={getPriorityColor(priority)}>
			{priority.toUpperCase()}
		</Badge>
	);
}
