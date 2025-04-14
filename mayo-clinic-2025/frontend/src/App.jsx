import React, { useState } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import ToastContainer from './components/ToastContainer';
import useTasks from './hooks/useTasks';
import './App.css';

function App() {
  const { 
    tasks, 
    isLoading, 
    error, 
    addTask, 
    editTask, 
    removeTask 
  } = useTasks();
  
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleSubmit = async (taskData) => {
    try {
      if (taskToEdit) {
        // Update existing task
        await editTask(taskToEdit.id, taskData);
        setTaskToEdit(null); // Reset editing state
      } else {
        // Create new task
        await addTask(taskData);
      }
    } catch (err) {
      // Error handling is done in the useTasks hook with toast notifications
    }
  };

  const handleEdit = (task) => {
    setTaskToEdit(task);
    // Scroll to form for better UX
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setTaskToEdit(null);
  };

  return (
    <div className="container">
      <Header />
      
      <main>
        <TaskForm 
          onSubmit={handleSubmit}
          initialTask={taskToEdit}
          onCancel={handleCancelEdit}
        />
        
        <TaskList 
          tasks={tasks}
          isLoading={isLoading}
          error={error}
          onEdit={handleEdit}
          onDelete={removeTask}
        />
      </main>

      {/* Toast Container for notifications */}
      <ToastContainer />
    </div>
  );
}

export default App;