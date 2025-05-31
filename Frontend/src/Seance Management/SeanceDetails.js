import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const SeanceDetails = () => {
    const { seanceId } = useParams(); // Retrieve the seanceId from URL
    const [seance, setSeance] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchSeanceDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/testV2/api/cinema/seances/${seanceId}`);
                setSeance(response.data); // Storing seance data in state
                setErrorMessage(""); // Clear any previous error messages
            } catch (error) {
                setErrorMessage("Failed to load seance details.");
            }
        };

        fetchSeanceDetails();
    }, [seanceId]);  // Re-run the fetch when the seanceId changes

    // Check if the seance exists, if not show loading/error
    if (!seance) {
        return <p>Loading...</p>;
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Seance Details</h2>
            {errorMessage && <p className="error" style={styles.error}>{errorMessage}</p>}
            <div style={styles.details}>
                <p><strong>Seance ID:</strong> {seance.id_seance}</p>
                <p><strong>Available Seats:</strong> {seance.availableSeats}</p>
                <p><strong>Total Seats:</strong> {seance.places}</p>
                <p><strong>Schedule:</strong> {new Date(seance.horaire).toLocaleString()}</p>
                <p><strong>Ticket Price:</strong> ${seance.tarif}</p>
            </div>
        </div>
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
    details: {
        textAlign: 'left',
    },
    error: {
        color: 'red',
        marginBottom: '10px',
    },
};

export default SeanceDetails;
