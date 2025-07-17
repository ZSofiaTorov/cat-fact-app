import React, { useEffect, useState } from 'react';

export default function CatFact() {
  const [fact, setFact] = useState('');
  const [gifUrl, setGifUrl] = useState('');

  // Cargar el dato y el gif al inicio
  const fetchData = async () => {
    const factRes = await fetch('/api/fact');
    const factData = await factRes.json();
    setFact(factData.fact);

    const query = factData.fact.split(' ').slice(0, 3).join(' ');
    const gifRes = await fetch(`/api/gif?query=${encodeURIComponent(query)}`);
    const gifData = await gifRes.json();
    setGifUrl(gifData.url);
  };

  // Solo refresca el GIF, no cambia el texto
  const refreshGif = async () => {
    const query = fact.split(' ').slice(0, 3).join(' ');
    const gifRes = await fetch(`/api/gif?query=${encodeURIComponent(query)}`);
    const gifData = await gifRes.json();
    setGifUrl(gifData.url);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', minHeight: '300px' }}>
      <img src={gifUrl} alt="GIF" style={{ maxWidth: '300px', borderRadius: '10px' }} />
      <div>
        <p style={{ fontSize: '1.2rem' }}>{fact}</p>
        <button onClick={refreshGif}>Refrescar GIF</button>
      </div>
    </div>
  );
}
    