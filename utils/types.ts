export type Task = {
    id: number;
    title: string;
    parentTask?: Task
    dueDate?: Date;
};