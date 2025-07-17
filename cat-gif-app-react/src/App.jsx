// src/App.jsx
import React, { useState } from 'react';
import FactDisplay from './components/FactDisplay';
import HistoryTable from './components/HistoryTable';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('resultados');

  return (
 <div className="App">
  <header className="app-header">
    <h1> Cat Facts App</h1>
    <div className="tabs">
      <button
        className={activeTab === 'resultados' ? 'tab active' : 'tab'}
        onClick={() => setActiveTab('resultados')}
      >
        Resultados
      </button>
      <button
        className={activeTab === 'historial' ? 'tab active' : 'tab'}
        onClick={() => setActiveTab('historial')}
      >
        Historial
      </button>
    </div>
  </header>

  {activeTab === 'resultados' ? <FactDisplay /> : <HistoryTable />}
</div>

  );
}

export default App;
