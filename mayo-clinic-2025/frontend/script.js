//API URL - used to make changes in backend
const API_URL = 'http://localhost:3000/api/tasks'

//DOM Elements
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('tasks-list');
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

//Event Listeners
document.addEventListener('DOMContentLoaded', fetchTasks);
taskForm.addEventListener('submit', handleFormSubmit);
cancelBtn.addEventListener('click', resetForm);

//Fetch all tasks
async function fetchTasks() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        if(response.ok) {
            tasks = data;
            renderTasks();
        } else {
            console.error('Failed to fetch tasks:', data.message);
        } 
    } catch(error) {
        console.error('Error fetching tasks:', error);
    }
}

function renderTasks() {
    if(tasks.length == 0) {
        tasksList.innerHTML = '<div class = "empty-state">No Tasks yet. Add one above!</div>';
        return;
    }
    taskList.innerHTML = '';
    tasks.forEach(task =>{
        const taskElement = document.createElement('div');
        taskElement.className = `task-item ${task.status == 'Completed' ? 'completed' : ''}`;
        taskElement.innerHTML = `
        <div class = "task-header>"
            <h3 class = "task-title">${task.name}</h3>
                <div class="task-actions">
                    <button class="edit-btn" data-id="${task.id}">Edit</button>
                    <button class="delete-btn" data-id="${task.id}">Delete</button>
                </div>
            </div>
            <p class="task-description">${task.description || 'No description provided'}</p>
            <span class="task-status status-${task.status.toLowerCase()}">${task.status}</span>            
    `});

    taskElement.querySelector('.edit-btn').addEventListener('click', () => editTask(task.id));
    taskElement.querySelector('.delete-btn').addEventListener('click', () => deleteTask(task.id));
    tasksList.append(taskElement);
}

// Handle Form Submit (Add or Update Task)
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const taskData = {
        name: taskNameInput.value,
        description: taskDescriptionInput.value,
        status: taskStatusInput.value
    };
    
    try {
        let response;
        
        if (isEditing) {
            // Update existing task
            const taskId = taskIdInput.value;
            response = await fetch(`${API_URL}/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(taskData)
            });
        } else {
            // Add new task
            response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(taskData)
            });
        }
        
        const data = await response.json();
        
        if (response.ok) {
            resetForm();
            fetchTasks();
        } else {
            console.error('Failed to save task:', data.message);
        }
    } catch (error) {
        console.error('Error saving task:', error);
    }
}

// Set Form to Edit Mode
function editTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    // Set form to edit mode
    isEditing = true;
    formTitle.textContent = 'Edit Task';
    submitBtn.textContent = 'Update Task';
    cancelBtn.classList.remove('hidden');
    
    // Populate form fields
    taskIdInput.value = task.id;
    taskNameInput.value = task.name;
    taskDescriptionInput.value = task.description || '';
    taskStatusInput.value = task.status;
    
    // Scroll to form
    taskForm.scrollIntoView({ behavior: 'smooth' });
}

// Delete Task
async function deleteTask(taskId) {
    if (!confirm('Are you sure you want to delete this task?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/${taskId}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            fetchTasks();
        } else {
            const data = await response.json();
            console.error('Failed to delete task:', data.message);
        }
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

// Reset Form to Add Mode
function resetForm() {
    isEditing = false;
    formTitle.textContent = 'Add New Task';
    submitBtn.textContent = 'Add Task';
    cancelBtn.classList.add('hidden');
    
    taskForm.reset();
    taskIdInput.value = '';
}
