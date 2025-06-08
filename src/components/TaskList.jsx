import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onUpdateStatus, onUpdateTask, onDeleteTask, onError, loading }) => {
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
        />
      ))}
    </ul>
  );
};

export default TaskList;
