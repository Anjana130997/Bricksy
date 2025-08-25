// KEPT: simple gallery with optional video
import React, { useState } from 'react';
import './PropertyGallery.css';

export default function PropertyGallery({ images = [], video = '' }) {
  const [idx, setIdx] = useState(0);
  const hasVideo = Boolean(video);
  const total = images.length + (hasVideo ? 1 : 0);

  return (
    <div className='card gallery'>
      <div className='main-media'>
        {hasVideo && idx === images.length ? (
          <iframe width='100%' height='400' src={video} title='Video tour' allowFullScreen />
        ) : (
          <img src={images[idx] || '/placeholder/placeholder.jpg'} alt='' />
        )}
      </div>
      <div className='thumbs'>
        {images.map((src, i) => (
          <button key={i} className={'thumb' + (i === idx ? ' active' : '')} onClick={() => setIdx(i)}>
            <img src={src} alt='' />
          </button>
        ))}
        {hasVideo && (
          <button className={'thumb' + (idx === images.length ? ' active' : '')} onClick={() => setIdx(images.length)}>▶ Video</button>
        )}
      </div>
    </div>
  );
}
