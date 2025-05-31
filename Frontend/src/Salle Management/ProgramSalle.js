import React, { useState } from 'react';
import axios from 'axios';

const ProgramSalle = () => {
    const [salleId, setSalleId] = useState('');
    const [filmId, setFilmId] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');

    const handleProgram = async () => {
        try {
            await axios.post(`http://localhost:8080/testV2/api/cinema/salle/program?salleId=${salleId}&filmId=${filmId}`);
            setSuccessMessage('Salle programmed successfully!');
            setError('');
        } catch (err) {
            setError('Failed to program salle.');
            setSuccessMessage('');
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Program Salle</h2>
            <input
                type="number"
                value={salleId}
                onChange={(e) => setSalleId(e.target.value)}
                placeholder="Salle ID"
                style={styles.input}
            />
            <input
                type="number"
                value={filmId}
                onChange={(e) => setFilmId(e.target.value)}
                placeholder="Film ID"
                style={styles.input}
            />
            <button onClick={handleProgram} style={styles.button}>Program</button>
            {successMessage && <p className="success" style={styles.success}>{successMessage}</p>}
            {error && <p className="error" style={styles.error}>{error}</p>}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    header: {
        marginBottom: '20px',
    },
    input: {
        marginBottom: '10px',
        padding: '10px',
        width: '100%',
        maxWidth: '400px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    success: {
        color: 'green',
        marginTop: '10px',
    },
    error: {
        color: 'red',
        marginTop: '10px',
    },
};

export default ProgramSalle;
