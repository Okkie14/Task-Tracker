"use client";

import { useGetAllTasks } from "@/hooks/useQueryHooks";
import { Task } from "@/types";
import { useState } from "react";
import TaskCard from "@/components/TaskCard";
import TaskStats from "@/components/TaskStats";
import FilterBar from "@/components/FilterBar";
import { Button } from "@/components/ui/button";
import { CheckSquare, Plus } from "lucide-react";
import {
	SignedIn,
	SignedOut,
	SignInButton,
	SignUp,
	UserButton,
} from "@clerk/nextjs";
import TaskModal from "@/components/TaskModal";
import TaskViewDetails from "@/components/TaskViewDetails";

const priorityOrder: Record<string, number> = {
	high: 1,
	medium: 2,
	low: 3,
};

export default function Home() {
	const { data, isLoading, isFetching, isError, error } = useGetAllTasks();
	const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
	const [editingTask, setEditingTask] = useState<Task | null>(null);
	const [selectedTask, setSelectedTask] = useState<Task | null>(null);

	// Filter states
	const [searchQuery, setSearchQuery] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [priorityFilter, setPriorityFilter] = useState("all");
	const [userFilter, setUserFilter] = useState("all");

	const handleEditTask = (task: Task) => {
		setEditingTask(task);
	};

	const closeEditModal = () => {
		setEditingTask(null);
	};

	// Filtered data
	const filteredTasks = data
		?.filter((task) => {
			const matchesSearch =
				task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				task.description
					.toLowerCase()
					.includes(searchQuery.toLowerCase());

			const matchesStatus =
				statusFilter === "all"
					? true
					: statusFilter === "completed"
					? task.completed
					: !task.completed;

			const matchesPriority =
				priorityFilter === "all"
					? true
					: task.priority === priorityFilter;

			const matchesUser =
				userFilter === "all" ? true : task.assignedTo === userFilter;

			return (
				matchesSearch && matchesStatus && matchesPriority && matchesUser
			);
		})
		?.sort((a, b) => {
			// ✅ First: Sort by dueDate (earliest first)
			const dateA = new Date(a.dueDate).getTime();
			const dateB = new Date(b.dueDate).getTime();

			if (dateA !== dateB) {
				return dateA - dateB;
			}

			// ✅ Then: Sort by priorityOrder (high priority first)
			return priorityOrder[a.priority] - priorityOrder[b.priority];
		});

	return (
		<main className="min-h-screen bg-background">
			<section className="container mx-auto px-4 py-8">
				{/* Header */}
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
					<div>
						<h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
							<CheckSquare className="h-8 w-8 text-primary" />
							Task Tracker
						</h1>
						<p className="text-muted-foreground">
							Stay organized and boost your productivity
						</p>
					</div>
					<div className="items-center gap-2 flex">
						<SignedOut>
							<SignInButton mode="modal">
								<Button>Sign In</Button>
							</SignInButton>
						</SignedOut>
						<SignedIn>
							<Button
								onClick={() => setIsCreateModalOpen(true)}
								className="mt-4 sm:mt-0"
								size="lg"
							>
								<Plus className="h-4 w-4 mr-2" />
								New Task
							</Button>
							<UserButton />
						</SignedIn>
					</div>
				</div>
				<SignedOut>
					<section className="flex justify-center items-center">
						<SignUp routing="hash" />
					</section>
				</SignedOut>
				<SignedIn>
					{/* Stats */}
					<TaskStats filteredTasks={filteredTasks} />
					{/* Filters */}
					<FilterBar
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
						statusFilter={statusFilter}
						setStatusFilter={setStatusFilter}
						priorityFilter={priorityFilter}
						setPriorityFilter={setPriorityFilter}
						userFilter={userFilter}
						setUserFilter={setUserFilter}
					/>
					{/* Task Grid */}
					<div className="mt-6">
						{data?.length === 0 ? (
							<div className="text-center py-12">
								<CheckSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
								<h3 className="text-lg font-medium text-muted-foreground mb-2">
									No tasks yet
								</h3>
								<p className="text-muted-foreground mb-4">
									Create your first task to get started
								</p>

								<Button
									onClick={() => setIsCreateModalOpen(true)}
								>
									<Plus className="h-4 w-4 mr-2" />
									Create Task
								</Button>
							</div>
						) : (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{filteredTasks?.map((task) => (
									<TaskCard
										key={task.id}
										task={task}
										onEdit={handleEditTask}
										onClick={setSelectedTask}
										isLoading={isLoading}
										isFetching={isFetching}
										isError={isError}
										message={error?.message}
									/>
								))}
							</div>
						)}
					</div>
				</SignedIn>
			</section>
			{/* Modals */}
			<TaskModal
				isOpen={isCreateModalOpen}
				onClose={() => setIsCreateModalOpen(false)}
				isEdit={editingTask !== null}
			/>

			<TaskModal
				isOpen={!!editingTask}
				onClose={closeEditModal}
				isEdit={editingTask !== null}
				task={editingTask || undefined}
			/>

			{selectedTask && (
				<TaskViewDetails
					isOpen={!!selectedTask}
					onClose={() => setSelectedTask(null)}
					task={selectedTask}
					onEdit={handleEditTask}
				/>
			)}
		</main>
	);
}
