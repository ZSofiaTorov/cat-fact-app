// src/components/FactDisplay.jsx
import React, { useState, useEffect } from 'react';

function FactDisplay() {
  const [fact, setFact] = useState('');
  const [gifUrl, setGifUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchFactAndGif = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5064/api/cat/gif');
      if (!response.ok) throw new Error('Error al obtener el dato');
      const data = await response.json();
      setFact(data.fact);
      setGifUrl(data.gif);
    } catch (err) {
      setError('Ocurrió un error al obtener el dato 😿');
    } finally {
      setLoading(false);
    }
  };

  const refreshGif = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5064/api/cat/gif');
      if (!response.ok) throw new Error('Error al refrescar el GIF');
      const data = await response.json();
      setGifUrl(data.gif); 
    } catch (err) {
      setError('No se pudo refrescar el GIF 🐾');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFactAndGif();
  }, []);

  return (
    <div className="result-container">
      <h2>Resultado actual</h2>
      {error && <p className="error">{error}</p>}
      {loading ? (
        <p className="loading">Cargando...</p>
      ) : (
        <div className="result-content">
          <div className="gif-box">
            {gifUrl && <img src={gifUrl} alt="Cat gif" className="gif" />}
          </div>
          <div className="fact-box">
            <p className="fact-text">{fact}</p>
            <button onClick={refreshGif} className="refresh-btn">
              🔁 Solo refrescar GIF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FactDisplay;
