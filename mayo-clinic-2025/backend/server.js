const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data store (in a real app, you'd use a database)
let tasks = [
    {
        id: 'sample-task-1',
        name: 'Complete project documentation',
        description: 'Finish writing the technical documentation for the project',
        status: 'Pending'
    },
    {
        id: 'sample-task-2',
        name: 'Deploy application',
        description: 'Deploy the application to production server',
        status: 'Completed'
    }
];

// Routes
// GET all tasks
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// GET a single task by ID
app.get('/api/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const task = tasks.find(t => t.id === taskId);
    
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    
    res.json(task);
});

// POST a new task
app.post('/api/tasks', (req, res) => {
    const { name, description, status } = req.body;
    
    // Validate request
    if (!name) {
        return res.status(400).json({ message: 'Task name is required' });
    }
    
    const newTask = {
        id: uuidv4(),
        name,
        description: description || '',
        status: status || 'Pending'
    };
    
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// PUT (update) an existing task
app.put('/api/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const { name, description, status } = req.body;
    
    // Find task index
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    
    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }
    
    // Validate request
    if (!name) {
        return res.status(400).json({ message: 'Task name is required' });
    }
    
    // Update task
    const updatedTask = {
        ...tasks[taskIndex],
        name,
        description: description || tasks[taskIndex].description,
        status: status || tasks[taskIndex].status
    };
    
    tasks[taskIndex] = updatedTask;
    res.json(updatedTask);
});

// DELETE a task
app.delete('/api/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    
    // Filter out the task to delete
    const initialLength = tasks.length;
    tasks = tasks.filter(t => t.id !== taskId);
    
    if (tasks.length === initialLength) {
        return res.status(404).json({ message: 'Task not found' });
    }
    
    res.json({ message: 'Task deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});