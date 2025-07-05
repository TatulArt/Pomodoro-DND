'use client';
import { useState } from 'react';
import styles from './taskSelector.module.css';

const TaskSelector = () => {
  const [selectedTask, setSelectedTask] = useState('');
  
  const tasks = [
    'Work on project',
    'Study for exam',
    'Exercise',
    'Read a book',
    'Practice coding',
    'Meditation',
    'House cleaning',
    'Shopping',
    'Call family',
    'Write in journal'
  ];

  const handleTaskChange = (event) => {
    setSelectedTask(event.target.value);
  };

  return (
    <div className={styles['task-selector-container']}>
      {selectedTask && (
        <div className={styles['selected-task-display']}>
          Selected Task:
        </div>
      )}
      <select 
        value={selectedTask} 
        onChange={handleTaskChange}
        className={styles['task-dropdown']}
      >
        <option value="" className={styles['task-dropdown-option']}>Choose a task...</option>
        {tasks.map((task, index) => (
          <option key={index} value={task}>
            {task}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TaskSelector;
