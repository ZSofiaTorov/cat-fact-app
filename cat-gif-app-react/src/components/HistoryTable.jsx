// src/components/HistoryTable.jsx
import React, { useEffect, useState } from 'react';

function HistoryTable() {
  const [historial, setHistorial] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistorial = async () => {
      setError('');
      try {
        const response = await fetch('http://localhost:5064/api/cat/history');
        if (!response.ok) throw new Error('Error al obtener historial');
        const data = await response.json();
        setHistorial(data);
      } catch (err) {
        setError('Ocurrió un error al obtener el historial 😿');
      }
    };

    fetchHistorial();
  }, []);

  return (
    <div className="historial-container">
      <h2>Historial de Consultas</h2>
      {error && <p className="error">{error}</p>}
      <div className="tabla-scroll">
        <table className="historial-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Fact</th>
              <th>Query</th>
              <th>GIF URL</th>
            </tr>
          </thead>
          <tbody>
            {historial.map((item, index) => (
              <tr key={index}>
                <td>{new Date(item.fecha).toLocaleString()}</td>
                <td>{item.fact}</td>
                <td>{item.query}</td>
                <td>
                  <a href={item.url} target="_blank" rel="noreferrer">
                    Ver GIF
                  </a>
                </td>
              </tr>
            ))}
            {historial.length === 0 && (
              <tr>
                <td colSpan="4">No hay registros aún.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HistoryTable;
