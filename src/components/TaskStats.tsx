import { Card, CardHeader, CardTitle } from "./ui/card";

export default function TaskStats() {
	return (
		<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
			<Card className="bg-blue-50 border border-blue-200">
				<CardHeader className="text-center">
					<CardTitle className="text-sm text-blue-600">
						Total Tasks
					</CardTitle>
					<p className="text-2xl font-bold text-blue-700">8</p>
				</CardHeader>
			</Card>
			<Card className="bg-green-50 border border-green-200">
				<CardHeader className="text-center">
					<CardTitle className="text-sm text-green-600">
						Completed
					</CardTitle>
					<p className="text-2xl font-bold text-green-700">3</p>
				</CardHeader>
			</Card>
			<Card className="bg-orange-50 border border-orange-200">
				<CardHeader className="text-center">
					<CardTitle className="text-sm text-orange-600">
						Pending
					</CardTitle>
					<p className="text-2xl font-bold text-orange-700">3</p>
				</CardHeader>
			</Card>
			<Card className="bg-red-50 border border-red-200">
				<CardHeader className="text-center">
					<CardTitle className="text-sm text-red-600">
						Overdue
					</CardTitle>
					<p className="text-2xl font-bold text-red-700">2</p>
				</CardHeader>
			</Card>
		</div>
	);
}
