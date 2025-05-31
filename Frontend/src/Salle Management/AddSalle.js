import React, { useState } from 'react';
import axios from 'axios';

const AddSalle = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [capacite, setCapacite] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');

    const handleAdd = async () => {
        try {
            await axios.post(
                'http://localhost:8080/testV2/api/cinema/salle/add?name=' + name + '&address=' + address + '&capacite=' + capacite,
                { name, address, capacite }
            );
            setSuccessMessage('Salle added successfully!');
            setError('');
        } catch (err) {
            setError('Failed to add salle.');
            setSuccessMessage('');
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Add Salle</h2>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Salle Name"
                style={styles.input}
            />
            <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Salle Address"
                style={styles.input}
            />
            <input
                type="number"
                value={capacite}
                onChange={(e) => setCapacite(e.target.value)}
                placeholder="Salle Capacity"
                style={styles.input}
            />
            <button onClick={handleAdd} style={styles.button}>Add</button>
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
        backgroundColor: '#f9a826',
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

export default AddSalle;