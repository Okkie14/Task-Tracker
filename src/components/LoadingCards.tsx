import React from "react";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

export default function LoadingCards({
	total,
	skeletonClass,
	containerClass,
}: {
	total: number;
	skeletonClass?: string;
	containerClass?: string;
}) {
	return (
		<div className={containerClass}>
			{Array.from({ length: total }).map((_, index) => (
				<Skeleton
					key={index}
					className={cn("h-[108px]", skeletonClass)}
				/>
			))}
		</div>
	);
}
