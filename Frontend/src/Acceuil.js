import React from 'react';
import './Acceuil.css';

const HomePage = () => {
    return (
        <div>
            <header className="header">
                <nav className="navbar">
                    <div className="logo">🎥 Cinéma Réservation</div>
                </nav>
                <div className="hero">
                    <h1>Bienvenue à Cinéma Réservation</h1>
                    <p>Réservez vos films préférés en quelques clics et profitez de la magie du cinéma.</p>
                    <a href="#films" className="btn-primary">Nous Offrons</a>
                </div>
            </header>

            <main>
                <section id="films" className="featured-movies">
                    <h2>Une experience à ne pas rater!</h2>
                    <div className="movie-grid">
                        <div className="movie-card">
                            <img src="./images/9aa6f284-e334-4331-8f83-ca85a08e3ba4.jpeg" alt="Affiche du Film 1" />
                            
                            <p>Restez jusqu'au dernier générique, chaque détail compte.</p>
                        </div>
                        <div className="movie-card">
                        <img src="./images/9dacf45f-f273-4cf2-b978-fc94e17204bf.jpeg" alt="Affiche du Film 1" />
                        
                            <p>Plongez dans l'instant avec du popcorn à portée de main.</p>
                        </div>
                        <div className="movie-card">
                        <img src="./images/83213e3f-0f0e-4547-9ac2-84895e83a5a3.jpeg" alt="Affiche du Film 1" />

                            <p>Chaque fin raconte une histoire et ouvre la porte à de nouvelles émotions.</p>
                        </div>
                    </div>
                </section>

                <section id="contact" className="contact-section">
                    <h2>Contactez-nous</h2>
                    <p>Pour toute question ou assistance, n'hésitez pas à nous contacter.</p>
                    <a href="#" className="btn-secondary">Nous écrire</a>
                </section>
            </main>
        </div>
    );
};

export default HomePage;
