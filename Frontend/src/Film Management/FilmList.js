import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReserveSeat from '../Seance Management/ReserveSeat';
import './movies.css';

const FilmList = () => {
    const [films, setFilms] = useState([]);
    const [selectedFilmId, setSelectedFilmId] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchFilms = async () => {
            try {
                const response = await axios.get('http://localhost:8080/testV2/api/cinema/films');
                setFilms(response.data);
            } catch (err) {
                setError('Failed to retrieve films.');
            }
        };
        fetchFilms();
    }, []);

    const toggleFilmDetails = (id) => {
        setSelectedFilmId(selectedFilmId === id ? null : id);
    };

    return (
        <div>
            <header className="header">
            <nav className="navbar">
                <div className="logo">🎥 Cinéma Réservation</div>
             </nav>
                <div className="hero">
                    <h1>Découvrez Nos Films</h1>
                    <p>Parcourez notre sélection et trouvez votre prochain coup de cœur cinématographique.</p>
                </div>
            </header>

            <main>
                <section id="search" className="search-section">
                    <input type="text" id="searchBar" placeholder="Rechercher un film..." onInput={filterMovies} />
                </section>

                <section id="films" className="movie-list">
                    <h2>Films Disponibles</h2>
                    {error && <p className="error">{error}</p>}
                    <div className="movie-grid" id="movieGrid">
                        {films.map((film) => (
                            <div
                                className={`movie-card ${selectedFilmId === film.id ? 'expanded' : ''}`}
                                key={film.id}
                                onClick={() => toggleFilmDetails(film.id)}
                            >
                                <h3 className="film-title">{film.name}</h3>
                                {selectedFilmId === film.id && (
                                    <div className="film-details">
                                        <p>{film.description}</p>
                                        <p>Director: {film.director}</p>
                                        <p>Release Date: {film.releaseDate}</p>
                                        {/* Add more details as necessary */}
                                        <div className="btn-containerFilm">
                                            <Link to="/ReserveSeat" className="btn-primary">
                                                Réserver
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
                <div className="add-film-button">
                    <Link to="/CreateFilm" className="btn-primary">
                        Ajouter Film
                    </Link>
                </div>
                <section id="contact" className="contact-section">
                    <h2>Contactez-nous</h2>
                    <p>Pour toute question ou assistance, n'hésitez pas à nous contacter.</p>
                    <a href="#" className="btn-secondary">Nous écrire</a>
                </section>
            </main>
        </div>
    );

};

const filterMovies = () => {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const movies = document.querySelectorAll('.movie-card');
    movies.forEach(movie => {
        const title = movie.querySelector('h3').textContent.toLowerCase();
        if (title.includes(query)) {
            movie.style.display = 'block';
        } else {
            movie.style.display = 'none';
        }
    });
};

export default FilmList;
