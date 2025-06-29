export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  }
  
  export interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    priority: 'high' | 'medium' | 'low';
    dueDate?: string;
    assignedTo?: User;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface TaskFilters {
    search: string;
    status: 'all' | 'completed' | 'pending';
    priority: 'all' | 'high' | 'medium' | 'low';
    assignedTo: 'all' | string;
  }