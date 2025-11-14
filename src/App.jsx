// src/App.jsx

import { Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';
import AdminPage from './pages/AdminPage.jsx';
import Films from './pages/Films.jsx';
import Series from './pages/Series.jsx';

// Composants
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AdminRoute from './components/AdminRoute.jsx';

// CSS
import './App.css';

function App() {
  return (
    <>
      <Navbar /> 
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/films" element={<Films />} />
        <Route path="/series" element={<Series />} />
        
        {/* Route protégée pour les utilisateurs normaux */}
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        
        {/* Route protégée pour l'admin */}
        <Route 
          path="/admin" 
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          } 
        />

      </Routes>
    </>
  );
}

export default App;