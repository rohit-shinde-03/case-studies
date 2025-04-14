// src/services/taskService.js
import { toast } from '../components/ToastContainer';

const API_URL = 'http://localhost:3000/api/tasks';

/**
 * Handle API responses and errors consistently
 * @param {Response} response - Fetch API response
 * @returns {Promise<any>} - Response data
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.message || `Error: ${response.status} ${response.statusText}`;
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
  return await response.json();
};

/**
 * Fetches all tasks from the API
 * @returns {Promise<Array>} Array of task objects
 */
export const fetchTasks = async () => {
  try {
    const response = await fetch(API_URL);
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

/**
 * Creates a new task
 * @param {Object} taskData - Task data object
 * @returns {Promise<Object>} Created task object
 */
export const createTask = async (taskData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskData)
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

/**
 * Updates an existing task
 * @param {string} taskId - Task ID to update
 * @param {Object} taskData - Updated task data
 * @returns {Promise<Object>} Updated task object
 */
export const updateTask = async (taskId, taskData) => {
  try {
    const response = await fetch(`${API_URL}/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskData)
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

/**
 * Deletes a task
 * @param {string} taskId - Task ID to delete
 * @returns {Promise<Object>} Deletion confirmation
 */
export const deleteTask = async (taskId) => {
  try {
    const response = await fetch(`${API_URL}/${taskId}`, {
      method: 'DELETE'
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};