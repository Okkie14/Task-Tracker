import React from "react";
import { SelectItem } from "./ui/select";
import { useGetClerkUsers } from "@/hooks/useQueryHooks";
import { Loader2 } from "lucide-react";

export default function UserNamesSelect() {
	const { data, isLoading, isFetching, isError } = useGetClerkUsers();
	return (
		<>
			{isLoading || isFetching ? (
				<div className="p-4 text-center">
					<Loader2 className="mx-auto h-4 w-4 animate-spin" />
				</div>
			) : isError ? (
				<SelectItem value="error" disabled>
					Failed to load users
				</SelectItem>
			) : (
				<>
					<SelectItem value="all">All Users</SelectItem>
					{data?.data?.map((user: any) => (
						<SelectItem key={user.id} value={user.id}>
							{user.firstName} {user.lastName}
						</SelectItem>
					))}
				</>
			)}
		</>
	);
}
