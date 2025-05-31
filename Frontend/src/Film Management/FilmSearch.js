import React, { useState } from 'react';
import axios from 'axios';

const FilmSearch = () => {
    const [pattern, setPattern] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        try {
            const response = await axios.get(`/cinema/films/search?pattern=${pattern}`);
            setResults(response.data);
        } catch (err) {
            setError('Failed to search films.');
        }
    };

    return (
        <div>
            <h2>Search Films</h2>
            <input 
                type="text" 
                value={pattern} 
                onChange={(e) => setPattern(e.target.value)} 
                placeholder="Enter pattern" 
            />
            <button onClick={handleSearch}>Search</button>
            {error && <p className="error">{error}</p>}
            <ul>
                {results.map((film) => (
                    <li key={film.id}>
                        {film.name}: {film.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FilmSearch;
