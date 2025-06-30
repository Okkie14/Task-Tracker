export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Task {
  id: string;
  clerkUserId: string;
  title: string;
  description: string;
  completed: boolean;
  priority: string;
  dueDate: string;
  assignedTo: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateTask = {
  title: string;
  description: string;
  completed?: boolean;
  priority: string;
  dueDate: string;
  assignedTo: string;
  createdAt: Date;
  updatedAt: Date;
}
  
export interface TaskFilters {
  search: string;
  status: 'all' | 'completed' | 'pending';
  priority: 'all' | 'high' | 'medium' | 'low';
  assignedTo: 'all' | string;
}

export type CreateFormData = {
  title: string;
  description: string;
  priority: Task["priority"];
  dueDate: string;
  assignedTo: string;
};