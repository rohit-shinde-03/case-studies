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
