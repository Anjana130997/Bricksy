// KEPT: simple embed map
import React from 'react';
import './PropertyMap.css';

export default function PropertyMap({ lat, lng, title }) {
  const src = `https://maps.google.com/maps?q=${lat},${lng}&z=14&output=embed`;
  return (
    <section className='card section'>
      <h2>Location</h2>
      <div className='map-embed'>
        <iframe title={title} width='100%' height='320' src={src} loading='lazy' />
      </div>
      <small style={{ color: 'var(--muted)' }}>Nearby POIs: schools, parks, transit (static demo)</small>
    </section>
  );
}
