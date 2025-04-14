// src/hooks/useTasks.js
import { useState, useEffect, useCallback } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from '../services/taskService';
import { toast } from '../components/ToastContainer';

/**
 * Custom hook for managing tasks state and operations
 * @returns {Object} Tasks state and CRUD functions
 */
const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load tasks on initial mount
  const loadTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchTasks();
      setTasks(data);
      toast.success('Tasks loaded successfully');
    } catch (err) {
      const errorMessage = 'Failed to load tasks. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error(err); // Keep console error for debugging
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // Create a new task
  const addTask = async (taskData) => {
    setIsLoading(true);
    setError(null);
    try {
      const newTask = await createTask(taskData);
      setTasks(prevTasks => [...prevTasks, newTask]);
      toast.success('Task created successfully');
      return newTask;
    } catch (err) {
      const errorMessage = 'Failed to create task. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error(err); // Keep console error for debugging
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Update an existing task
  const editTask = async (taskId, taskData) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedTask = await updateTask(taskId, taskData);
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === taskId ? updatedTask : task
        )
      );
      toast.success('Task updated successfully');
      return updatedTask;
    } catch (err) {
      const errorMessage = 'Failed to update task. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error(err); // Keep console error for debugging
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a task
  const removeTask = async (taskId) => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteTask(taskId);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
      toast.success('Task deleted successfully');
    } catch (err) {
      const errorMessage = 'Failed to delete task. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error(err); // Keep console error for debugging
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    tasks,
    isLoading,
    error,
    loadTasks,
    addTask,
    editTask,
    removeTask
  };
};

export default useTasks;