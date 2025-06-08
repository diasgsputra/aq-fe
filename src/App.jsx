import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm.jsx'; 
import TaskList from './components/TaskList.jsx'; 
import { fetchAllTasks, updateTaskStatus, updateTask, deleteTask, moveTaskOrder } from './api/api.jsx'; 

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleFetchAllTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchAllTasks();
      setTasks(data);
    } catch (err) {
      console.error('Gagal mengambil tugas:', err);
      setError('Gagal memuat tugas. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchAllTasks();
  }, []);

  const handleUpdateTaskStatus = async (id, currentStatus) => {
    setError('');
    try {
      await updateTaskStatus(id, !currentStatus);
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, status: !currentStatus } : task
      ));
    } catch (err) {
      console.error('Gagal memperbarui status tugas:', err);
      setError('Gagal memperbarui status. Silakan coba lagi.');
    }
  };

  const handleUpdateTask = async (id, name, description) => {
    setError('');
    try {
      await updateTask(id, name, description);
      await handleFetchAllTasks();
    } catch (err) {
      console.error('Gagal memperbarui tugas:', err);
      setError('Gagal memperbarui tugas. Silakan coba lagi.');
    }
  };

  const handleDeleteTask = async (id) => {
    setError('');
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      console.error('Gagal menghapus tugas:', err);
      setError('Gagal menghapus tugas. Silakan coba lagi.');
    }
  };

  const handleMoveTaskOrder = async (id, newRanking, reorderedTasksFromChild) => {
    const oldTasks = [...tasks];


    setError('');
    try {
      await moveTaskOrder(id, newRanking);
      await handleFetchAllTasks();
    } catch (err) {
      console.error('Gagal memperbarui urutan tugas:', err);
      setError('Gagal memperbarui urutan. Silakan coba lagi.');
      setTasks(oldTasks); 
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4 font-inter">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 hover:scale-[1.005]">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Daftar Tugas Anda</h1>

        {error && (
          <p className="text-red-600 mb-4 bg-red-100 p-3 rounded-md border border-red-200">{error}</p>
        )}

        <TaskForm onTaskAdded={handleFetchAllTasks} onError={setError} />

        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Daftar Semua Tugas</h2>
        <TaskList
          tasks={tasks}
          onUpdateStatus={handleUpdateTaskStatus}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
          onError={setError}
          loading={loading}
          onMoveOrder={handleMoveTaskOrder}
        />
      </div>
    </div>
  );
};

export default App;
