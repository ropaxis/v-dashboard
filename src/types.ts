export interface Task {
    task: string;
    done: boolean;
    id: string;
}

export type TasksFilter = 'all' | 'todo' | 'done';