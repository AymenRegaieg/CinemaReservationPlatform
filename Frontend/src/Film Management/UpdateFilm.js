import React, { useState } from 'react';
import axios from 'axios';

const UpdateFilm = () => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`/cinema/films/${id}?id=${id}&filmName=${name}&filmDescription=${description}`);
            setSuccessMessage('Film updated successfully!');
            setError('');
        } catch (err) {
            setError('Failed to update film.');
            setSuccessMessage('');
        }
    };

    return (
        <div>
            <h2>Update Film</h2>
            <input
                type="number"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="Film ID"
            />
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Film Name"
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Film Description"
            />
            <button onClick={handleUpdate}>Update</button>
            {successMessage && <p className="success">{successMessage}</p>}
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default UpdateFilm;
