import React from 'react';
import PropTypes from 'prop-types';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onEdit, onDelete, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="tasks-container">
        <h2>Your Tasks</h2>
        <div className="loading-state">Loading tasks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="tasks-container">
        <h2>Your Tasks</h2>
        <div className="error-state">{error}</div>
      </div>
    );
  }

  return (
    <div className="tasks-container">
      <h2>Your Tasks</h2>
      <div className="tasks-list" aria-label="Task list">
        {tasks.length === 0 ? (
          <div className="empty-state">No tasks yet. Add one above!</div>
        ) : (
          tasks.map(task => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onEdit={onEdit} 
              onDelete={onDelete} 
            />
          ))
        )}
      </div>
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      status: PropTypes.string.isRequired
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.string
};

TaskList.defaultProps = {
  isLoading: false,
  error: null
};

export default TaskList;