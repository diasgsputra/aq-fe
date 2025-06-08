import React, { useState } from 'react';
import { CheckCircle, Circle, Edit, Trash2, X, Save } from 'lucide-react';

const TaskItem = ({ task, onUpdateStatus, onUpdateTask, onDeleteTask, onError, onDragStart, onDragOver, onDrop }) => { 
  const [editing, setEditing] = useState(false);
  const [editingName, setEditingName] = useState(task.name);
  const [editingDescription, setEditingDescription] = useState(task.description);

  const handleUpdateTask = async () => {
    if (!editingName.trim()) {
      onError('Nama tugas tidak boleh kosong.');
      return;
    }
    onError('');
    await onUpdateTask(task.id, editingName, editingDescription);
    setEditing(false);
  };

  const handleCancelEditing = () => {
    setEditing(false);
    setEditingName(task.name);
    setEditingDescription(task.description);
  };

  return (
    <li
      className="bg-white p-6 rounded-lg shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-300 hover:shadow-xl hover:scale-[1.005] cursor-grab active:cursor-grabbing" // Baris 28-29: Menambahkan styling cursor untuk drag
      draggable="true" 
      onDragStart={(e) => onDragStart(e, task.id)} 
      onDragOver={(e) => onDragOver(e, task.id)} 
      onDrop={(e) => onDrop(e, task.id)} 
    >
      {editing ? (
        <div className="flex-1 w-full">
          <input
            type="text"
            className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-lg font-semibold"
            value={editingName}
            onChange={(e) => setEditingName(e.target.value)}
          />
          <textarea
            rows="2"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-gray-600 resize-y"
            value={editingDescription}
            onChange={(e) => setEditingDescription(e.target.value)}
          ></textarea>
          <div className="flex mt-3 gap-2">
            <button
              onClick={handleUpdateTask}
              className="bg-green-500 text-white p-2 rounded-md flex items-center gap-1 hover:bg-green-600 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-sm"
            >
              <Save size={16} /> Simpan
            </button>
            <button
              onClick={handleCancelEditing}
              className="bg-gray-400 text-white p-2 rounded-md flex items-center gap-1 hover:bg-gray-500 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-sm"
            >
              <X size={16} /> Batal
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1" onClick={() => onUpdateStatus(task.id, task.status)}>
          <div className="flex items-center gap-3">
            {task.status ? (
              <CheckCircle size={24} className="text-green-500 flex-shrink-0" />
            ) : (
              <Circle size={24} className="text-gray-400 flex-shrink-0" />
            )}
            <div>
              <p className={`text-xl font-semibold ${task.status ? 'text-gray-500' : 'text-gray-800'}`}>
                {task.name}
              </p>
              {task.description && (
                <p className={`text-gray-600 text-sm ${task.status ? 'text-gray-400' : ''}`}>
                  {task.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {!editing && (
        <div className="flex-shrink-0 flex items-center gap-2 mt-4 sm:mt-0">
          <button
            onClick={() => setEditing(true)}
            className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-300 transform hover:scale-110 active:scale-90 shadow-md"
            aria-label="Edit Task"
          >
            <Edit size={20} />
          </button>
          <button
            onClick={() => onDeleteTask(task.id)}
            className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-all duration-300 transform hover:scale-110 active:scale-90 shadow-md"
            aria-label="Delete Task"
          >
            <Trash2 size={20} />
          </button>
        </div>
      )}
    </li>
  );
};

export default TaskItem;
