import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { AlertCircle } from "lucide-react";

export default function ErrorCard({ message }: { message?: string }) {
	return (
		<Card>
			<CardHeader>
				<AlertCircle className="size-8 text-destructive mx-auto mb-2" />
				<CardTitle className="text-center text-destructive">
					An Error has occurred
				</CardTitle>
			</CardHeader>
			<CardContent>
				<p>{message}</p>
			</CardContent>
		</Card>
	);
}
