import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/api.js'; 

function Register() {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await registerUser({ nom, email, password });
      
      setLoading(false);
      alert("Compte créé avec succès ! Vous pouvez maintenant vous connecter.");
      navigate('/login');

    } catch (err) {
      setLoading(false);
      console.error(err);
      setError("Erreur lors de la création du compte. L'email est peut-être déjà pris.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <h2>Inscription</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          
          <div className="input-group">
            <input
              type="text"
              placeholder="Nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="input-group">
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Création...' : "S'inscrire"}
          </button>
          
          <div className="login-help">
            <p>Déjà un compte ? <Link to="/login">Connectez-vous.</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;