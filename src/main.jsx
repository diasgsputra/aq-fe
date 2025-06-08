import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Pastikan path benar dan ekstensi .js ditambahkan
import './index.css'; // Import CSS utama Anda (termasuk Tailwind CSS)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
