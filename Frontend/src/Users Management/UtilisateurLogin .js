import React, { useState } from 'react';
import axios from 'axios';
import { Route, Routes, useNavigate ,Link} from 'react-router-dom';
import CreateUser from './CreateUser';

const UtilisateurLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if both fields are filled
    if (!username || !password) {
      setErrorMessage('Veuillez remplir tous les champs.');
      return;
    }

    console.log('Sending username:', username);
    console.log('Sending password:', password);

    try {
      const response = await axios.post(
        'http://localhost:8080/testV2/api/utilisateur/init',
        { username, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Handle successful response
      if (response.data && response.data.userId) {
        const userId = response.data.userId;
        console.log('Login successful, userId:', userId);
        navigate(`/reserve-seat?userId=${userId}`);
      } else {
        setErrorMessage('Réponse invalide du serveur.');
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMsg = error.response?.data || 'Échec de la connexion.';
      setErrorMessage('Login successful');
    }
  };

  return (
    <div>
      <header className="header">
        <nav className="navbar">
          <div className="logo">🎥 Cinéma Réservation</div>
        </nav>
        <div className="hero">
          <h1>Connexion</h1>
          <p>Connectez-vous pour réserver vos films préférés.</p>
        </div>
      </header>

      <main>
        <section className="register-section">
          <h2>Connexion</h2>
          <form onSubmit={handleSubmit} className="register-form">
            <div className="input-group">
              <label htmlFor="username">Nom d'utilisateur</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Votre nom d'utilisateur"
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Votre mot de passe"
              />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="submit" className="btn-primary">Se connecter</button>
          </form>
          <p className="register-link">
            Pas encore de compte ? <ul>
            <li><Link to="/createUser">Create User</Link></li>
            </ul>
          </p>
          <div>
            <Routes>
            <Route path='/createUser' element={<CreateUser/>}></Route>
            </Routes>
          </div>
        </section>
      </main>
    </div>
  );
};

export default UtilisateurLogin;
