// src/pages/AdminPage.jsx
import React, { useState, useEffect } from 'react';

// Importer TOUTES les fonctions API nécessaires
import { 
  createMovie, 
  createSerie,
  fetchMovies,
  fetchSeries,
  deleteMovie,
  deleteSerie
} from '../services/api.js';

// --- (Partie 1 : Formulaires d'ajout - Inchangé) ---

function AddMovieForm() {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState('');
  const [images, setImages] = useState('');
  const [dateDeSortie, setDateDeSortie] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const categoriesArray = categories.split(',').map(s => s.trim());
      const imagesArray = images.split(',').map(s => s.trim());
      const movieData = {
        titre, description, categories: categoriesArray, images: imagesArray, dateDeSortie: new Date(dateDeSortie),
      };
      await createMovie(movieData);
      setMessage('Film ajouté avec succès !');
      // Vider le formulaire
      setTitre(''); setDescription(''); setCategories(''); setImages(''); setDateDeSortie('');
    } catch (error) {
      console.error(error);
      setMessage("Erreur lors de l'ajout du film.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h3>Ajouter un Film</h3>
      {message && <p style={{ color: message.includes('Erreur') ? 'red' : 'green' }}>{message}</p>}
      <div className="input-group"><input type="text" placeholder="Titre" value={titre} onChange={(e) => setTitre(e.target.value)} required /></div>
      <div className="input-group"><textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required /></div>
      <div className="input-group"><input type="text" placeholder="Catégories (séparées par des virgules)" value={categories} onChange={(e) => setCategories(e.target.value)} required /></div>
      <div className="input-group"><input type="text" placeholder="URLs des Images (séparées par des virgules)" value={images} onChange={(e) => setImages(e.target.value)} required /></div>
      <div className="input-group"><input type="date" placeholder="Date de sortie" value={dateDeSortie} onChange={(e) => setDateDeSortie(e.target.value)} required /></div>
      <button type="submit" className="login-button">Ajouter le Film</button>
    </form>
  );
}

function AddSerieForm() {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState('');
  const [images, setImages] = useState('');
  const [dateDeSortie, setDateDeSortie] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const categoriesArray = categories.split(',').map(s => s.trim());
      const imagesArray = images.split(',').map(s => s.trim());
      const serieData = {
        titre, description, categories: categoriesArray, images: imagesArray, dateDeSortie: new Date(dateDeSortie),
      };
      await createSerie(serieData);
      setMessage('Série ajoutée avec succès !');
      // Vider le formulaire
      setTitre(''); setDescription(''); setCategories(''); setImages(''); setDateDeSortie('');
    } catch (error) {
      console.error(error);
      setMessage("Erreur lors de l'ajout de la série.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h3>Ajouter une Série</h3>
      {message && <p style={{ color: message.includes('Erreur') ? 'red' : 'green' }}>{message}</p>}
      <div className="input-group"><input type="text" placeholder="Titre" value={titre} onChange={(e) => setTitre(e.target.value)} required /></div>
      <div className="input-group"><textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required /></div>
      <div className="input-group"><input type="text" placeholder="Catégories (séparées par des virgules)" value={categories} onChange={(e) => setCategories(e.target.value)} required /></div>
      <div className="input-group"><input type="text" placeholder="URLs des Images (séparées par des virgules)" value={images} onChange={(e) => setImages(e.target.value)} required /></div>
      <div className="input-group"><input type="date" placeholder="Date de sortie" value={dateDeSortie} onChange={(e) => setDateDeSortie(e.target.value)} required /></div>
      <button type="submit" className="login-button">Ajouter la Série</button>
    </form>
  );
}

// --- (Partie 2 : Nouvelle section de GESTION/SUPPRESSION) ---

function ManageContent() {
  // State pour les listes
  const [films, setFilms] = useState([]);
  const [series, setSeries] = useState([]);
  // State pour le "menu" (choisir films ou series)
  const [manageView, setManageView] = useState('films');
  const [loading, setLoading] = useState(true);

  // Charger les films et séries au démarrage de ce composant
  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    setLoading(true);
    try {
      const [filmsRes, seriesRes] = await Promise.all([
        fetchMovies(),
        fetchSeries()
      ]);
      setFilms(filmsRes.data);
      setSeries(seriesRes.data);
    } catch (error) {
      console.error("Erreur chargement contenu:", error);
    }
    setLoading(false);
  };

  // Fonction pour supprimer un film
  const handleDeleteMovie = async (id) => {
    // Demander confirmation
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce film ?")) {
      try {
        await deleteMovie(id);
        // Mettre à jour la liste dans l'état (sans recharger la page)
        setFilms(films.filter(film => film.id !== id));
      } catch (error) {
        console.error("Erreur suppression film:", error);
      }
    }
  };

  // Fonction pour supprimer une série
  const handleDeleteSerie = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette série ?")) {
      try {
        await deleteSerie(id);
        // Mettre à jour la liste
        setSeries(series.filter(serie => serie.id !== id));
      } catch (error) {
        console.error("Erreur suppression série:", error);
      }
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h2>Gérer le Contenu Existant</h2>
      
      {/* Le "menu" pour choisir */}
      <div style={{ marginBottom: '20px' }}>
        <button className="login-button" onClick={() => setManageView('films')} disabled={manageView === 'films'}>
          Gérer les Films
        </button>
        <button className="login-button" onClick={() => setManageView('series')} disabled={manageView === 'series'} style={{ marginLeft: '10px' }}>
          Gérer les Séries
        </button>
      </div>

      {loading && <p>Chargement...</p>}

      {/* Affichage conditionnel de la liste */}
      {!loading && manageView === 'films' && (
        <div>
          <h3>Liste des Films ({films.length})</h3>
          {films.map(film => (
            <div key={film.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', border: '1px solid #333' }}>
              <span>{film.titre}</span>
              <button onClick={() => handleDeleteMovie(film.id)} style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
                Supprimer
              </button>
            </div>
          ))}
        </div>
      )}

      {!loading && manageView === 'series' && (
        <div>
          <h3>Liste des Séries ({series.length})</h3>
          {series.map(serie => (
            <div key={serie.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', border: '1px solid #333' }}>
              <span>{serie.titre}</span>
              <button onClick={() => handleDeleteSerie(serie.id)} style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
                Supprimer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


// --- (Partie 3 : La page Admin complète qui affiche tout) ---

function AdminPage() {
  return (
    <div className="profile-page"> {/* On réutilise le style de la page profil */}
      <h2>Panneau d'Administration</h2>
      
      <hr style={{ margin: '20px 0' }} />
      <AddMovieForm />
      
      <hr style={{ margin: '40px 0' }} />
      <AddSerieForm />
      
      <hr style={{ margin: '40px 0' }} />
      <ManageContent />
    </div>
  );
}

export default AdminPage;