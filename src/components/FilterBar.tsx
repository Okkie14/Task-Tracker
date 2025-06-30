"use client";

import { Search } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction } from "react";
import UserNamesSelect from "./UserNamesSelect";

type FilterBarProps = {
	searchQuery: string;
	setSearchQuery: Dispatch<SetStateAction<string>>;
	statusFilter: string;
	setStatusFilter: Dispatch<SetStateAction<string>>;
	priorityFilter: string;
	setPriorityFilter: Dispatch<SetStateAction<string>>;
	userFilter: string;
	setUserFilter: Dispatch<SetStateAction<string>>;
};

export default function FilterBar({
	searchQuery,
	setSearchQuery,
	statusFilter,
	setStatusFilter,
	priorityFilter,
	setPriorityFilter,
	userFilter,
	setUserFilter,
}: FilterBarProps) {
	return (
		<section className="flex flex-col sm:flex-row gap-4 p-4 bg-muted/30 rounded-lg">
			<div className="relative flex-1">
				<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
				<Input
					placeholder="Search tasks..."
					className="pl-10"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</div>
			<div className="flex gap-3">
				<Select value={statusFilter} onValueChange={setStatusFilter}>
					<SelectTrigger className="w-[130px]">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Status</SelectItem>
						<SelectItem value="pending">Pending</SelectItem>
						<SelectItem value="completed">Completed</SelectItem>
					</SelectContent>
				</Select>

				<Select
					value={priorityFilter}
					onValueChange={setPriorityFilter}
				>
					<SelectTrigger className="w-[130px]">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Priority</SelectItem>
						<SelectItem value="high">High</SelectItem>
						<SelectItem value="medium">Medium</SelectItem>
						<SelectItem value="low">Low</SelectItem>
					</SelectContent>
				</Select>

				<Select value={userFilter} onValueChange={setUserFilter}>
					<SelectTrigger className="w-[150px]">
						<SelectValue placeholder="All Users" />
					</SelectTrigger>
					<SelectContent>
						<UserNamesSelect />
					</SelectContent>
				</Select>
			</div>
		</section>
	);
}
