import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Assuming you are using react-router for navigation
import { Link } from 'react-router-dom';

const GetAllSeance = () => {
    const [seances, setSeances] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchSeances = async () => {
            try {
                const response = await axios.get("http://localhost:8080/testV2/api/cinema/seances");
                setSeances(response.data);
            } catch (error) {
                setErrorMessage("Failed to load seances. Please try again.");
            }
        };

        fetchSeances();
    }, []);

    // Handle Seance Deletion
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/testV2/api/cinema/seances/${id}`);
            setSeances(seances.filter((seance) => seance.id_seance !== id));
            setErrorMessage("");  // Clear any previous errors
        } catch (error) {
            setErrorMessage("Failed to delete seance. Please try again.");
        }
    };

    // Navigate to Update Seance page
    const handleUpdate = (id) => {
        navigate(`/update-seance/${id}`);  // Assuming a route for updating seance
    };

    return (
        <>
            <header className="header">
                <nav className="navbar">
                    <div className="logo">🎥 Cinéma Réservation</div>
                </nav>
                <div className="hero">
                    <h1>Les Séances</h1>
                    <p>Découvrez les Séances de vos Films Préferés</p>
                </div>
            </header>
            <div style={styles.container}>
                <h2 style={styles.header}>All Seances</h2>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>ID</th>
                            <th style={styles.th}>Schedule</th>
                            <th style={styles.th}>Tarif</th>
                            <th style={styles.th}>availableSeats</th>
                            <th style={styles.th}>Places</th>
                            <th style={styles.th}>SalleProg ID</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {seances.map((seance) => (
                            <tr key={seance.id_seance}>
                                <td style={styles.td}>{seance.id_seance}</td>
                                <td style={styles.td}>{seance.horaire}</td>
                                <td style={styles.td}>{seance.tarif}</td>
                                <td style={styles.td}>{seance.availableSeats}</td>
                                <td style={styles.td}>{seance.places}</td>
                                <td style={styles.td}>{seance.salleProg}</td>
                                <td style={styles.td}>
                                    <div className="btn-containerFilm">
                                        <Link to="/UpdateSeance" style={styles.button}> Update </Link>
                                        <Link to='/DeleteSeance' style={styles.button}> Delete </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                {errorMessage && <p className="error" style={styles.error}>{errorMessage}</p>}
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <button onClick={() => navigate('/create-seance')} style={styles.button}>
                        Ajouter Seance
                    </button>
                </div>
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
    th: {
        backgroundColor: '#f9a826',
        color: '#fff',
        padding: '10px',
        border: '1px solid black',
    },
    td: {
        padding: '10px',
        border: '1px solid black',
    },
    button: {
        padding: '5px 10px',
        backgroundColor: '#f9a826',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginRight: '5px',
    },
    error: {
        color: 'red',
        marginTop: '10px',
    },
    btnContainerFilm: {
        display: 'flex',
        gap: '10px',
    },
};

export default GetAllSeance;
