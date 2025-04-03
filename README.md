# Task Tracker Application

A simple task tracking web application where users can add, update, and delete tasks.

## Features

- Add new tasks with name, description, and status
- View all tasks in a clean, organized list
- Edit existing tasks
- Delete tasks
- Mark tasks as Pending or Completed

## Project Structure

```
task-tracker/
│
├── frontend/
│   ├── index.html      # Main HTML page
│   ├── styles.css      # CSS styles
│   └── script.js       # Frontend JavaScript code
│
└── backend/
    ├── server.js       # Node.js/Express server
    └── package.json    # Node.js dependencies
```

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Backend**: Node.js, Express
- **Data Storage**: In-memory (for demonstration purposes)

## Setup Instructions

### Prerequisites

- Node.js (v14.x or higher)
- npm (v6.x or higher)

### Backend Setup

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/task-tracker.git
   cd task-tracker/backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```
   
   For development with auto-restart:
   ```
   npm run dev
   ```

4. The backend server will start running on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd ../frontend
   ```

2. You can serve the frontend using any static file server. For example, with Node.js:
   ```
   npx serve
   ```
   Or use a VS Code extension like "Live Server"

3. Open the application in your browser (typically at `http://localhost:5000` or the URL provided by your static server)

## API Endpoints

The backend provides the following REST API endpoints:

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a specific task by ID
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update an existing task
- `DELETE /api/tasks/:id` - Delete a task

### Request/Response Examples

#### Create a new task
```
POST /api/tasks
Content-Type: application/json

{
  "name": "Complete project",
  "description": "Finish the task tracker project",
  "status": "Pending"
}
```

#### Update a task
```
PUT /api/tasks/task-id-here
Content-Type: application/json

{
  "name": "Complete project",
  "description": "Updated description",
  "status": "Completed"
}
```
