import React, { useState } from 'react';
import axios from 'axios';

const DeleteFilm = () => {
    const [id, setId] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`/cinema/film/${id}`);
            setSuccessMessage(response.data);
            setError('');
        } catch (err) {
            setError('Failed to delete film.');
            setSuccessMessage('');
        }
    };

    return (
        <div>
            <h2>Delete Film</h2>
            <input
                type="number"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="Film ID"
            />
            <button onClick={handleDelete}>Delete</button>
            {successMessage && <p className="success">{successMessage}</p>}
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default DeleteFilm;
