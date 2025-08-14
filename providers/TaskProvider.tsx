// TODO: Set Min/Max once and store in State.

import { Task } from '@/utils/types';
import React, { createContext, ReactNode, useContext, useEffect, useReducer } from 'react';

// Mock async API functions
const fakeAPI = {
    fetchTasks: async () => {
        // Simulate API call
        return [
            { id: 1, priority: 1, title: 'Book flights', description: 'Find the best airline tickets for upcoming vacation and confirm bookings.', dueDate: new Date('2025-08-01') },
            { id: 7, priority: 1, title: 'Pay utility bills', description: 'Settle electricity, water, and internet bills online.', dueDate: new Date('2025-08-15') },
            { id: 12, priority: 1, title: 'Renew driver’s license', description: 'Gather documents and complete license renewal online or in person.', dueDate: new Date('2025-08-30') },
            { id: 18, priority: 2, title: 'Print boating permit', description: 'Download, print, and store the updated boating license on board.' },
            { id: 13, priority: 2, title: 'Clean coffee machine', description: 'Run descaling cycle and wipe down coffee maker for maintenance.' },
            { id: 2, priority: 2, title: 'Just do it', description: 'Motivate yourself to start that lingering task you have been putting off.' },
            { id: 5, priority: 3, title: 'Schedule dentist appointment', description: 'Contact dental clinic and arrange a check-up.', dueDate: new Date('2025-09-10') },
            { id: 9, priority: 3, title: 'Organize desk', description: 'Declutter and arrange workstation items for improved focus.' },
            { id: 16, priority: 3, title: 'Upgrade home Wi-Fi router', description: 'Replace old router with a faster model for better connectivity.', dueDate: new Date('2025-09-15') },
            { id: 19, priority: 4, title: 'Test new JavaScript feature', description: 'Experiment with and evaluate performance of a new JS API or syntax.' },
            { id: 22, priority: 4, title: 'Fix leaking faucet', description: 'Purchase parts and repair dripping kitchen or bathroom faucet.', dueDate: new Date('2025-09-02') },
            { id: 6, priority: 5, title: 'Plan weekend biking route', description: 'Map out a scenic cycling path and prepare supplies for the ride.' },
            { id: 3, priority: 5, title: 'Make dinner', description: 'Prepare a healthy home-cooked meal using available ingredients.' },
            { id: 15, priority: 6, title: 'Prepare picnic for beach', description: 'Plan menu, pack food, and gather supplies for a beach trip.' },
            { id: 21, priority: 6, title: 'Plan coffee tasting event', description: 'Organize coffee varieties, tasting cards, and invitations for the event.' },
            { id: 11, priority: 7, title: 'Backup laptop files', description: 'Copy all important documents to an external drive or cloud.', dueDate: new Date('2025-08-25') },
            { id: 4, priority: 7, title: 'Order new tires', description: 'Purchase replacement tires for the car and arrange installation.', dueDate: new Date('2025-08-01') },
            { id: 14, priority: 8, title: 'Review investment portfolio', description: 'Analyze financial performance and adjust allocations if needed.', dueDate: new Date('2025-09-05') },
            { id: 8, priority: 8, title: 'Oil change for car', description: 'Schedule and complete an oil change to maintain vehicle health.', dueDate: new Date('2025-08-20') },
            { id: 23, priority: 9, title: 'Pack for Rhode Island sailing trip', description: 'Prepare clothing, boating gear, and safety equipment for sailing.', dueDate: new Date('2025-08-28') },
            { id: 20, priority: 9, title: 'Refill propane tank', description: 'Exchange or refill propane for grill or camping equipment.', dueDate: new Date('2025-08-22') },
            { id: 10, priority: 10, title: 'Call Mom', description: 'Catch up with Mom and check in on how she is doing.' },
            { id: 17, priority: 10, title: 'Buy birthday gift for Sarah', description: 'Choose and purchase a thoughtful gift, wrap it, and write a card.', dueDate: new Date('2025-08-18') },
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
    getMinMaxPriority: () => { minPriority: number, maxPriority: number }
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
            const task = state.tasks.filter((task: any) => task.id == id)[0]
            // const task = await fakeAPI.getTaskById(id);
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

    // Returns the minimum priority value from the data array
    function getMinMaxPriority() {
        let minMax = {
            minPriority: 0,
            maxPriority: 0
        }

        if (Array.isArray(state.tasks) || state.tasks.length === 0) {
            minMax.minPriority = Math.min(...state.tasks.map((item: Task) => item.priority));
            minMax.maxPriority = Math.max(...state.tasks.map((item: Task) => item.priority));
        }

        return minMax
    }

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
                getMinMaxPriority
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

// Custom Hook to use TaskContext
export function useTasks() {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}