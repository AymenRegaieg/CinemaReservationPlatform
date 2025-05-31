import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SallesList = () => {
    const [salles, setSalles] = useState([]);
    const [expandedRow, setExpandedRow] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchSalles = async () => {
            try {
                const response = await axios.get('http://localhost:8080/testV2/api/cinema/salles');
                setSalles(response.data);
                setErrorMessage('');
            } catch (error) {
                setErrorMessage('Failed to load salles. Please try again.');
            }
        };

        fetchSalles();
    }, []);

    const toggleExpandRow = (id) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    return (
        <>
            <header className="header">
                <nav className="navbar">
                    <div className="logo">🎥 Cinéma Réservation</div>
                </nav>
                <div className="hero">
                    <h1>Découvrez Nos Salles</h1>
                    <p>Parcourez notre sélection et trouvez la salle qui vous convient le mieux.</p>
                </div>
            </header>

            <div style={styles.container}>
                <h2 style={styles.header}>Liste des Salles</h2>
                {errorMessage && <p className="error" style={styles.error}>{errorMessage}</p>}
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th>ID Salle</th>
                            <th>Nom</th>
                            <th>Addresse</th>    
                            <th>Capacité</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salles.map((salle) => (
                            <React.Fragment key={salle.id_salle}>
                                <tr>
                                    <td>{salle.id_salle}</td>
                                    <td>{salle.name}</td>
                                    <td>{salle.address}</td>
                                    <td>{salle.capacite}</td>
                                    <td>
                                        <button
                                            style={styles.button}
                                            onClick={() => toggleExpandRow(salle.id_salle)}
                                        >
                                            {expandedRow === salle.id_salle ? 'Moins détails' : 'Plus Détails'}
                                        </button>
                                    </td>
                                </tr>
                                {expandedRow === salle.id_salle && (
                                    <tr>
                                        <td colSpan="5" style={styles.expandedRow}>
                                            <p><strong>Autres Details:</strong></p>
                                            <p>Description: {salle.description || 'N/A'}</p>
                                            <p>Autres Info: {salle.otherInfo || 'N/A'}</p>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
                <Link to="/salle/add" style={styles.addButton}>
                    Ajouter Salle
                </Link>
            </div>
        </>
    );
};

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    header: {
        marginBottom: '20px',
        textAlign: 'center',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    button: {
        backgroundColor: '#f9a826',
        color: '#fff',
        padding: '0.8rem 1.5rem',
        textDecoration: 'none',
        borderRadius: '5px',
        display: 'block',
        margin: '20px auto',
        width: 'fit-content',
        textAlign: 'center',
        '&:hover': {
            backgroundColor: '#af7b27',
        },
    },
    addButton: {
        backgroundColor: '#f9a826',
        color: '#fff',
        padding: '0.8rem 1.5rem',
        textDecoration: 'none',
        borderRadius: '5px',    
        display: 'block',
        margin: '20px auto',
        width: 'fit-content',
        textAlign: 'center',
        '&:hover': {
            backgroundColor: '#af7b27',
        },
    },
    expandedRow: {
        backgroundColor: '#f1f1f1',
        padding: '10px',
    },
    error: {
        color: 'red',
        marginBottom: '10px',
    },
};

export default SallesList