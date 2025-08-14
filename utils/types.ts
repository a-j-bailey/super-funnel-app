export type Task = {
    id: number;
    title: string;
    priority: number;
    description?: string;
    parentTask?: Task
    dueDate?: Date;
    completedDate?: Date;
};