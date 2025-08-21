// TODO: Set Min/Max once and store in State.

import { supabase } from '@/utils/supabase';
import { Task } from '@/utils/types';
import React, { createContext, ReactNode, useContext, useEffect, useReducer } from 'react';
import { useAuth } from './AuthProvider';

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
    createTask: (task: Omit<Task, 'id' | 'completed' | 'priority'>) => Promise<any>
    markTaskCompleted: (id: any) => Promise<any>
    getMinMaxPriority: () => { minPriority: number, maxPriority: number }
}

// Create Context
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Provider Component
export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const { user, session } = useAuth()
    const [state, dispatch] = useReducer(taskReducer, initialState);

    // Fetch tasks if user or session changes.
    useEffect(() => {
        console.log('Updating Tasks...')
        fetchTasks()
    }, [user, session])

    // Fetch all tasks
    const fetchTasks = async () => {
        dispatch({ type: ACTIONS.FETCH_START });
        try {
            let { data: tasks, error } = await supabase
                .from('tasks')
                .select('*')
                .eq('completed', false)
                .order('priority', { ascending: true })

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
            return task;
        } catch (error) {
            console.error('Error fetching task by ID:', error);
            return null;
        }
    };

    // Mark task as completed
    const createTask = async (task: Omit<Task, 'id' | 'completed' | 'priority'>) => {
        try {
            // TODO: Swap this for API call.
            const { data, error } = await supabase
                .from('tasks')
                .insert([
                    {
                        title: task.title,
                        description: task.description,
                        priority: Math.floor(Math.random() * 10) + 1
                    },
                ])
                .select()

            if (data) {
                dispatch({ type: ACTIONS.ADD_TASK, payload: data })
            } else {
                console.log(data)
                console.error(error)
            }
        } catch (error) {
            console.error('Error marking task completed:', error);
        }
    };


    // Mark task as completed
    const markTaskCompleted = async (id: any) => {
        try {
            // TODO: This needs to update the DB.
            const task = state.tasks.filter((task: Task) => task.id == id)[0];
            if (!task) throw new Error('Task not found');

            const updatedTask = {
                ...task,
                completed: true,
                completedDate: new Date()
            };
            // Dispatch the updated task to update the state
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
                createTask,
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