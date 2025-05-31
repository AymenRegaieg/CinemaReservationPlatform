import React, { useState } from "react";
import axios from "axios";
import './CreateUser.css'; // Assuming you have the CSS in a file named styles.css
import { Link } from "react-router-dom";
import styles from './CreateUser.css'; // Import the CSS file as styles object
const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/testV2/api/utilisateur/create?username=${username}&password=${password}`);
      if (response.status === 201) {
        setMessage(response.data); // Success message
        setIsSuccess(true);
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data); // Error message from the backend
      } else {
        setMessage("An unexpected error occurred");
      }
      setIsSuccess(false);
    }
  };

  return (
    <div>
      <header className="header">
        <nav className="navbar">
          <div className="logo">🎥 Cinéma Réservation</div>
        </nav>
        <div className="hero">
          <h1>Créer un Compte</h1>
          <p>Rejoignez-nous et commencez à réserver vos films préférés.</p>
        </div>
      </header>

      <main>
        <section className="register-section">
          <h2>Créez votre compte</h2>
          <form onSubmit={handleCreateUser} className="register-form">
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
            <button type="submit" className="btn-primary">Créer un compte</button>
          </form>
          {message && <p className={isSuccess ? "success-message" : "error-message"}>{message}</p>}
          <p className="login-link">Vous avez déjà un compte ? <Link to="/UtilisateurLogin" style={styles.addButton}>
                          Se Connecter
                      </Link></p>
        </section>
      </main>
    </div>
  );
};

export default CreateUser;
