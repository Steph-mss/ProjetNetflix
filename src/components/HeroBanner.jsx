// src/components/HeroBanner.jsx
import React from 'react';

function HeroBanner({ serie }) {

  // S'il n'y a pas de série (ou si la BDD est vide), on affiche un fond noir.
  if (!serie || !serie.images || serie.images.length === 0) {
    return (
      <div 
        className="hero-banner-fallback"
        style={{
          height: '500px', // Hauteur fixe
          backgroundColor: '#111',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingLeft: '50px'
        }}
      >
        <h1 style={{ fontSize: '3.5rem', color: 'white' }}>AniméFlix</h1>
        <p style={{color: 'grey'}}>Ajoutez une série via la page Admin pour l'afficher ici.</p>
      </div>
    );
  }

  // On prend la première image de la série
  const imageUrl = serie.images[0];

  // --- C'est ici qu'on corrige le style ---
  const heroStyle = {
    height: '600px', // <-- **Hauteur fixe**. 
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: '50px', // "Coller à gauche" (avec une marge)
    color: 'white',

    // --- C'est ici que l'image et le fondu sont gérés ---
    // Le navigateur va superposer les deux :
    // 1. Le fondu noir (de gauche à droite)
    // 2. L'image de la série
    backgroundImage: `
      linear-gradient(to right, rgba(0, 0, 0, 0.9) 25%, rgba(0, 0, 0, 0) 70%),
      url(${imageUrl})
    `,
    
    backgroundSize: 'cover', // "s'adapte" (remplit sans déformer)
    backgroundPosition: 'center center', // "s'adapte" (centre l'image)
    backgroundRepeat: 'no-repeat',
    
    position: 'relative', 
    zIndex: 1,
  };

  return (
    <div className="hero-banner" style={heroStyle}>
      
      {/* Le texte (par-dessus le fondu) */}
      <div 
        style={{
          maxWidth: '45%', // Le texte ne prend que la partie gauche (foncée)
          position: 'relative', 
          zIndex: 2, 
        }}
      >
        <h1 style={{ fontSize: '3.5rem', marginBottom: '20px' }}>
          {serie.titre}
        </h1>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.5' }}>
          {serie.description}
        </p>
      </div>
    </div>
  );
}

export default HeroBanner;