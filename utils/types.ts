export type Task = {
    id: number;
    title: string;
    priority: number;
    completed: boolean;
    description?: string;
    parentTask?: Task
    dueDate?: Date;
    completedDate?: Date;
};