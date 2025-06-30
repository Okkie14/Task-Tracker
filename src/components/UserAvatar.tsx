import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function UserAvatar({ assignedTo }: { assignedTo: string }) {
	const [userName, setUserName] = useState<string>("");
	const [initials, setInitials] = useState<string>("");

	useEffect(() => {
		const fetchUser = async () => {
			if (!assignedTo) return;

			const cacheKey = `user_${assignedTo}`;
			const cached = localStorage.getItem(cacheKey);

			if (cached) {
				const parsed = JSON.parse(cached);
				setUserName(parsed.name);
				setInitials(parsed.initials);
				return;
			}

			try {
				const res = await fetch(`/api/user/${assignedTo}`);
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
	}, [assignedTo]);

	return (
		<div className="flex items-center space-x-2">
			<Avatar className="h-6 w-6">
				<AvatarFallback className="text-xs">
					{initials || assignedTo.substring(0, 2).toUpperCase()}
				</AvatarFallback>
			</Avatar>
			{userName && <span>{userName}</span>}
		</div>
	);
}
