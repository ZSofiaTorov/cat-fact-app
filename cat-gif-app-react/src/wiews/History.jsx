import React, { useEffect, useState } from 'react';

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await fetch('/api/history');
      const data = await res.json();
      setHistory(data);
    };
    fetchHistory();
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Historial de Búsquedas</h2>
      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Texto</th>
            <th>Query</th>
            <th>GIF URL</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item, index) => (
            <tr key={index}>
              <td>{new Date(item.fecha).toLocaleString()}</td>
              <td>{item.fact}</td>
              <td>{item.query}</td>
              <td><a href={item.url} target="_blank" rel="noopener noreferrer">Ver GIF</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
