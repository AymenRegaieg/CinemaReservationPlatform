import React, { useState } from 'react';
import axios from 'axios';

const CreateFilm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');

    const createFilm = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/testV2/api/cinema/createFilm?name=${name}&description=${description}`);
            setSuccessMessage('Film created successfully!');
            setError('');
        } catch (err) {
            setError('Failed to create film.');
            setSuccessMessage('');
        }
    };

    return (
        <>
            <header className="header">
                <nav className="navbar">
                    <div className="logo">🎥 Cinéma Réservation</div>
                </nav>
                <div className="hero">
                    <h1>Découvrez Nos Films</h1>
                    <p>Parcourez notre sélection et trouvez votre prochain coup de cœur cinématographique.</p>
                </div>
            </header>
            <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
                <h2>Create New Film</h2>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Film Name" 
                    style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px' }}
                />
                <textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    placeholder="Film Description" 
                    style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px' }}
                />
                <button 
                    onClick={createFilm} 
                    style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: '#FFF', border: 'none', cursor: 'pointer' }}
                >
                    Create
                </button>
                {successMessage && <p className="success" style={{ color: 'green' }}>{successMessage}</p>}
                {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
            </div>
        </>
    );
};

export default CreateFilm;
