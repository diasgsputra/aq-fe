import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const TaskForm = ({ onTaskAdded, onError }) => {
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const API_BASE_URL = 'https://aq-be.vercel.app/api/task';

  const handleCreateTask = async () => {
    if (!newTaskName.trim()) {
      onError('Nama tugas tidak boleh kosong.');
      return;
    }
    setIsAdding(true);
    onError('');
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newTaskName, description: newTaskDescription }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setNewTaskName('');
      setNewTaskDescription('');
      onTaskAdded();
    } catch (err) {
      console.error('Gagal membuat tugas:', err);
      onError('Gagal menambahkan tugas. Silakan coba lagi.');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="mb-8 p-6 bg-gray-50 rounded-lg shadow-inner">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Tambah Tugas Baru</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Nama Tugas"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleCreateTask();
            }
          }}
          disabled={isAdding}
        />
      </div>
      <div className="mb-4">
        <textarea
          placeholder="Deskripsi Tugas (Opsional)"
          rows="3"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 resize-y"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          disabled={isAdding}
        ></textarea>
      </div>
      <button
        onClick={handleCreateTask}
        className="w-full bg-indigo-600 text-white py-3 rounded-md flex items-center justify-center gap-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.01] active:scale-95 shadow-md"
        disabled={isAdding}
      >
        {isAdding ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Menambahkan...
          </span>
        ) : (
          <>
            <Plus size={20} /> Tambah Tugas
          </>
        )}
      </button>
    </div>
  );
};

export default TaskForm;
