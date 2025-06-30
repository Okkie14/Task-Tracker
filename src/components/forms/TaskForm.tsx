import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useCreateTaskForm } from "@/hooks/useForm";
import { useGetClerkUsers } from "@/hooks/useQueryHooks";
import { CreateFormData, Task } from "@/types";
import { useEffect } from "react";

type TaskModalProps = {
	isOpen: boolean;
	onClose: () => void;
	onSave: (task: CreateFormData) => void;
	task?: Task;
	// users: User[];
};

export default function TaskForm({
	isOpen,
	onClose,
	onSave,
	task,
}: // users,
TaskModalProps) {
	const { data } = useGetClerkUsers();
	const form = useCreateTaskForm();

	// Reset form values on task or open change
	useEffect(() => {
		if (task && data?.data) {
			form.reset({
				title: task.title,
				description: task.description,
				priority: task.priority.toLowerCase(),
				dueDate: task.dueDate,
				assignedTo: task.assignedTo,
			});

			// Force the field to update
			setTimeout(() => {
				form.setValue("priority", task.priority.toLowerCase(), {
					shouldValidate: true,
					shouldDirty: true,
				});
				form.setValue("assignedTo", task.assignedTo, {
					shouldValidate: true,
					shouldDirty: true,
				});
			}, 0);
		} else {
			form.reset({
				title: "",
				description: "",
				priority: "medium",
				dueDate: "",
				assignedTo: "",
			});
		}
	}, [task, isOpen, form, data?.data]);

	const onSubmit = (data: CreateFormData) => {
		const taskData: CreateFormData = {
			title: data.title,
			description: data.description,
			priority: data.priority,
			dueDate: data.dueDate,
			assignedTo: data.assignedTo,
		};

		onSave(taskData);
		onClose();
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				{/* Title */}
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter task title..."
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Description */}
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Enter task description..."
									rows={4}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="grid grid-cols-2 gap-4">
					{/* Priority */}
					<FormField
						control={form.control}
						name="priority"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Priority</FormLabel>
								<FormControl>
									<Select
										onValueChange={field.onChange}
										value={field.value}
									>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select priority" />
										</SelectTrigger>
										<SelectContent className="w-full">
											<SelectItem value="high">
												High
											</SelectItem>
											<SelectItem value="medium">
												Medium
											</SelectItem>
											<SelectItem value="low">
												Low
											</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Due Date */}
					<FormField
						control={form.control}
						name="dueDate"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Due Date</FormLabel>
								<FormControl>
									<Input type="date" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* Assigned To */}
				<FormField
					control={form.control}
					name="assignedTo"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Assign To</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									value={field.value}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select a user..." />
									</SelectTrigger>
									<SelectContent className="w-full">
										<SelectGroup>
											<SelectLabel>Users</SelectLabel>
											{data?.data?.map((user: any) => (
												<SelectItem
													key={user.id}
													value={user.id}
												>
													{user.firstName}{" "}
													{user.lastName}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex justify-end space-x-3 pt-4">
					<Button type="button" variant="outline" onClick={onClose}>
						Cancel
					</Button>
					<Button type="submit">
						{task ? "Update Task" : "Create Task"}
					</Button>
				</div>
			</form>
		</Form>
	);
}
