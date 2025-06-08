import React, { useState, useCallback } from 'react';
import TaskItem from './TaskItem.jsx'; 

const TaskList = ({ tasks, onUpdateStatus, onUpdateTask, onDeleteTask, onError, loading, onMoveOrder }) => {
  const [draggedTaskId, setDraggedTaskId] = useState(null);

  const handleDragStart = useCallback((e, id) => {
    setDraggedTaskId(id);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', id);
  }, []);

  const handleDragOver = useCallback((e, id) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e, targetId) => {
    e.preventDefault();
    if (!draggedTaskId || draggedTaskId === targetId) {
      return;
    }

    const draggedTask = tasks.find(task => task.id === draggedTaskId);
    const targetTask = tasks.find(task => task.id === targetId);

    if (!draggedTask || !targetTask) {
      return;
    }

    const newTasks = [...tasks];
    const draggedIndex = newTasks.findIndex(task => task.id === draggedTaskId);
    let targetIndex = newTasks.findIndex(task => task.id === targetId);

    newTasks.splice(draggedIndex, 1);
    newTasks.splice(targetIndex, 0, draggedTask);

    const newIndexAfterDrop = newTasks.findIndex(task => task.id === draggedTaskId);

    const newRanking = (newTasks.length - newIndexAfterDrop)+1;


    onMoveOrder(draggedTaskId, newRanking, newTasks); 

    setDraggedTaskId(null);
  }, [draggedTaskId, tasks, onMoveOrder]);

  if (loading) {
    return <p className="text-center text-gray-500 text-lg">Memuat tugas...</p>;
  }

  if (tasks.length === 0) {
    return <p className="text-center text-gray-500 text-lg">Tidak ada tugas. Mulai tambahkan satu!</p>;
  }

  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdateStatus={onUpdateStatus}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
          onError={onError}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        />
      ))}
    </ul>
  );
};

export default TaskList;
