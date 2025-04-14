import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ConfirmModal from './ConfirmModal';

const TaskItem = ({ task, onEdit, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEdit = () => {
    onEdit(task);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    onDelete(task.id);
    setShowDeleteModal(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className={`task-item ${task.status === 'Completed' ? 'completed' : ''}`}>
        <div className="task-header">
          <h3 className="task-title">{task.name}</h3>
          <div className="task-actions">
            <button 
              className="edit-btn" 
              onClick={handleEdit}
              aria-label={`Edit task ${task.name}`}
            >
              Edit
            </button>
            <button 
              className="delete-btn" 
              onClick={handleDeleteClick}
              aria-label={`Delete task ${task.name}`}
            >
              Delete
            </button>
          </div>
        </div>
        
        <p className="task-description">
          {task.description || 'No description provided'}
        </p>
        
        <span className={`task-status status-${task.status.toLowerCase()}`}>
          {task.status}
        </span>
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Confirm Deletion"
        message={`Are you sure you want to delete the task "${task.name}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    status: PropTypes.string.isRequired
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default TaskItem;