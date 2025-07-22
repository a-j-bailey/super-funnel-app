import React, { createContext, ReactNode, useContext, useEffect, useReducer } from 'react';

// Mock async API functions
const fakeAPI = {
    fetchTasks: async () => {
        // Simulate API call
        return [
            { id: '1', title: 'Buy groceries', completed: false },
            { id: '2', title: 'Walk the dog', completed: false },
        ];
    },
    getTaskById: async (id: any) => {
        const tasks = await fakeAPI.fetchTasks();
        return tasks.find((task) => task.id === id);
    },
    updateTask: async (updatedTask: any) => {
        // Simulate updating in DB
        return updatedTask;
    },
};

// Initial state
const initialState = {
    tasks: [],
    loading: false,
    error: null,
};

// Actions
const ACTIONS = {
    FETCH_START: 'FETCH_START',
    FETCH_SUCCESS: 'FETCH_SUCCESS',
    FETCH_ERROR: 'FETCH_ERROR',
    ADD_TASK: 'ADD_TASK',
    UPDATE_TASK: 'UPDATE_TASK',
};

// Reducer function
function taskReducer(state: any, action: any) {
    switch (action.type) {
        case ACTIONS.FETCH_START:
            return { ...state, loading: true, error: null };
        case ACTIONS.FETCH_SUCCESS:
            return { ...state, loading: false, tasks: action.payload };
        case ACTIONS.FETCH_ERROR:
            return { ...state, loading: false, error: action.payload };
        case ACTIONS.ADD_TASK:
            return { ...state, tasks: [...state.tasks, action.payload] };
        case ACTIONS.UPDATE_TASK:
            return {
                ...state,
                tasks: state.tasks.map((task: any) =>
                    task.id === action.payload.id ? action.payload : task
                ),
            };
        default:
            return state;
    }
}

type TaskContextType = {
    tasks: any[],
    loading: boolean,
    error: Error,
    fetchTasks: () => void
    fetchTaskById: (id: any) => Promise<any>
    markTaskCompleted: (id: any) => Promise<any>
}

// Create Context
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Provider Component
export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(taskReducer, initialState);

    // Fetch all tasks
    const fetchTasks = async () => {
        dispatch({ type: ACTIONS.FETCH_START });
        try {
            const tasks = await fakeAPI.fetchTasks();
            dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: tasks });
        } catch (error) {
            if (error instanceof Error) {
                dispatch({ type: ACTIONS.FETCH_ERROR, payload: error.message });
            }
        }
    };

    // Fetch task by ID
    const fetchTaskById = async (id: any) => {
        try {
            const task = await fakeAPI.getTaskById(id);
            return task;
        } catch (error) {
            console.error('Error fetching task by ID:', error);
            return null;
        }
    };

    // Mark task as completed
    const markTaskCompleted = async (id: any) => {
        try {
            const task = await fetchTaskById(id);
            if (!task) throw new Error('Task not found');
            const updatedTask = { ...task, completed: true };
            await fakeAPI.updateTask(updatedTask);
            dispatch({ type: ACTIONS.UPDATE_TASK, payload: updatedTask });
        } catch (error) {
            console.error('Error marking task completed:', error);
        }
    };

    // Load tasks initially
    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <TaskContext.Provider
            value={{
                tasks: state.tasks,
                loading: state.loading,
                error: state.error,
                fetchTasks,
                fetchTaskById,
                markTaskCompleted,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

// Custom Hook to use TaskContext
export const useTasks = () => useContext(TaskContext);
