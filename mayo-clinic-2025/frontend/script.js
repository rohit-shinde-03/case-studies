// API URL - Update this based on your backend setup
const API_URL = 'http://localhost:3000/api/tasks';

// DOM Elements
const taskForm = document.getElementById('task-form');
const tasksList = document.getElementById('tasks-list');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const taskIdInput = document.getElementById('task-id');
const taskNameInput = document.getElementById('task-name');
const taskDescriptionInput = document.getElementById('task-description');
const taskStatusInput = document.getElementById('task-status');

// State Management
let tasks = [];
let isEditing = false;

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, fetching tasks...');
    fetchTasks();
});

taskForm.addEventListener('submit', handleFormSubmit);
cancelBtn.addEventListener('click', resetForm);

// Debug function to safely log objects
function safeLog(label, obj) {
    try {
        console.log(label, JSON.stringify(obj));
    } catch (e) {
        console.log(label, 'Could not stringify object', obj);
    }
}

// Fetch All Tasks
async function fetchTasks() {
    console.log('Fetching tasks from:', API_URL);
    try {
        const response = await fetch(API_URL);
        console.log('Server response status:', response.status);
        const data = await response.json();
        console.log('Data received:', data);
        
        if (response.ok) {
            tasks = Array.isArray(data) ? data : [];
            safeLog('Tasks array:', tasks);
            displayTasks();
        } else {
            console.error('Failed to fetch tasks:', data.message);
            tasksList.innerHTML = '<div class="empty-state">Error: Could not load tasks</div>';
        }
    } catch (error) {
        console.error('Error fetching tasks:', error);
        tasksList.innerHTML = '<div class="empty-state">Error loading tasks. Check console for details.</div>';
    }
}

// Display Tasks - Completely rewritten function
function displayTasks() {
    console.log('Displaying tasks, count:', tasks.length);
    
    // Clear the current list
    tasksList.innerHTML = '';
    
    // Handle empty state
    if (!tasks || tasks.length === 0) {
        console.log('No tasks to display');
        tasksList.innerHTML = '<div class="empty-state">No tasks yet. Add one above!</div>';
        return;
    }
    
    // Create a document fragment to improve performance
    const fragment = document.createDocumentFragment();
    
    // Process each task
    tasks.forEach((task, index) => {
        console.log(`Processing task ${index}:`, task);
        
        // Skip invalid tasks
        if (!task || !task.id) {
            console.warn('Skipping invalid task:', task);
            return;
        }
        
        try {
            // Create task element
            const taskEl = document.createElement('div');
            taskEl.className = `task-item ${task.status === 'Completed' ? 'completed' : ''}`;
            
            // Set inner HTML
            taskEl.innerHTML = `
                <div class="task-header">
                    <h3 class="task-title">${task.name || 'Unnamed Task'}</h3>
                    <div class="task-actions">
                        <button class="edit-btn" data-id="${task.id}">Edit</button>
                        <button class="delete-btn" data-id="${task.id}">Delete</button>
                    </div>
                </div>
                <p class="task-description">${task.description || 'No description provided'}</p>
                <span class="task-status status-${(task.status || 'pending').toLowerCase()}">${task.status || 'Pending'}</span>
            `;
            
            // Add event listeners
            const editBtn = taskEl.querySelector('.edit-btn');
            if (editBtn) {
                editBtn.addEventListener('click', () => {
                    console.log('Edit button clicked for task ID:', task.id);
                    editTask(task.id);
                });
            }
            
            const deleteBtn = taskEl.querySelector('.delete-btn');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', () => {
                    console.log('Delete button clicked for task ID:', task.id);
                    deleteTask(task.id);
                });
            }
            
            // Add to fragment
            fragment.appendChild(taskEl);
            
        } catch (err) {
            console.error(`Error creating task element for task ${index}:`, err);
        }
    });
    
    // Append all tasks at once
    tasksList.appendChild(fragment);
    console.log('Task display complete');
}

// Handle Form Submit (Add or Update Task)
async function handleFormSubmit(e) {
    e.preventDefault();
    console.log('Form submitted, mode:', isEditing ? 'edit' : 'add');
    
    const taskData = {
        name: taskNameInput.value,
        description: taskDescriptionInput.value,
        status: taskStatusInput.value
    };
    
    safeLog('Task data:', taskData);
    
    try {
        let response;
        
        if (isEditing) {
            // Update existing task
            const taskId = taskIdInput.value;
            console.log('Updating task ID:', taskId);
            
            response = await fetch(`${API_URL}/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(taskData)
            });
        } else {
            // Add new task
            console.log('Creating new task');
            
            response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(taskData)
            });
        }
        
        console.log('Server response status:', response.status);
        const data = await response.json();
        safeLog('Server response data:', data);
        
        if (response.ok) {
            console.log('Task saved successfully');
            resetForm();
            await fetchTasks(); // Refresh the task list
        } else {
            console.error('Failed to save task:', data.message);
            alert('Error: ' + (data.message || 'Could not save task'));
        }
    } catch (error) {
        console.error('Error saving task:', error);
        alert('Error saving task. Check console for details.');
    }
}

// Set Form to Edit Mode
function editTask(taskId) {
    console.log('Editing task ID:', taskId);
    const task = tasks.find(t => t.id === taskId);
    
    if (!task) {
        console.error('Task not found with ID:', taskId);
        return;
    }
    
    // Set form to edit mode
    isEditing = true;
    formTitle.textContent = 'Edit Task';
    submitBtn.textContent = 'Update Task';
    cancelBtn.classList.remove('hidden');
    
    // Populate form fields
    taskIdInput.value = task.id;
    taskNameInput.value = task.name || '';
    taskDescriptionInput.value = task.description || '';
    taskStatusInput.value = task.status || 'Pending';
    
    // Scroll to form
    taskForm.scrollIntoView({ behavior: 'smooth' });
}

// Delete Task
async function deleteTask(taskId) {
    console.log('Deleting task ID:', taskId);
    
    if (!confirm('Are you sure you want to delete this task?')) {
        console.log('Delete cancelled by user');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/${taskId}`, {
            method: 'DELETE'
        });
        
        console.log('Server response status:', response.status);
        
        if (response.ok) {
            console.log('Task deleted successfully');
            fetchTasks(); // Refresh the task list
        } else {
            const data = await response.json();
            console.error('Failed to delete task:', data.message);
            alert('Error: ' + (data.message || 'Could not delete task'));
        }
    } catch (error) {
        console.error('Error deleting task:', error);
        alert('Error deleting task. Check console for details.');
    }
}

// Reset Form to Add Mode
function resetForm() {
    console.log('Resetting form');
    isEditing = false;
    formTitle.textContent = 'Add New Task';
    submitBtn.textContent = 'Add Task';
    cancelBtn.classList.add('hidden');
    
    taskForm.reset();
    taskIdInput.value = '';
}