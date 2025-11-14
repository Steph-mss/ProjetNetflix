import React, { useState, useEffect } from 'react'; 
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const { login, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 

    const success = await login(email, password); 

    if (success) {
      navigate('/'); 
    } else {
      setError('Email ou mot de passe incorrect. ');
    }
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <h2>Connexion</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
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
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
          <div className="login-help">
            <div className="login-help">
  <p>Nouveau ici ? <Link to="/register">Inscrivez-vous.</Link></p></div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;