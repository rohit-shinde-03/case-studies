import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const TaskForm = ({ onSubmit, initialTask, onCancel }) => {
  const [task, setTask] = useState({
    name: '',
    description: '',
    status: 'Pending'
  });
  const [isEditing, setIsEditing] = useState(false);

  // Set form to edit mode if initialTask is provided
  useEffect(() => {
    if (initialTask) {
      setTask({
        name: initialTask.name || '',
        description: initialTask.description || '',
        status: initialTask.status || 'Pending'
      });
      setIsEditing(true);
    } else {
      setTask({ name: '', description: '', status: 'Pending' });
      setIsEditing(false);
    }
  }, [initialTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!task.name.trim()) {
      alert('Task name is required');
      return;
    }
    
    // Pass the task data to parent component
    onSubmit(task);
    
    // Reset form if not editing
    if (!isEditing) {
      setTask({ name: '', description: '', status: 'Pending' });
    }
  };

  const handleCancel = () => {
    setTask({ name: '', description: '', status: 'Pending' });
    setIsEditing(false);
    if (onCancel) onCancel();
  };

  return (
    <div className="form-container">
      <h2>{isEditing ? 'Edit Task' : 'Add New Task'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Task Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={task.name}
            onChange={handleChange}
            required
            aria-label="Task name"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            rows="3"
            aria-label="Task description"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={task.status}
            onChange={handleChange}
            aria-label="Task status"
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        
        <div className="button-group">
          <button type="submit" className="submit-btn">
            {isEditing ? 'Update Task' : 'Add Task'}
          </button>
          {isEditing && (
            <button
              type="button"
              className="cancel-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

TaskForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialTask: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string
  }),
  onCancel: PropTypes.func
};

export default TaskForm;