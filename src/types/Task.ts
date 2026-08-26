export interface Task {
  id: string;
  userId: string;
  title: string;
  description: string;
  completed: boolean;
  priority?: boolean;
  createdAt: Date;
}