import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DeleteSeance = () => {
    const [seanceId, setSeanceId] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/testV2/api/cinema/seances/${seanceId}`);
            setErrorMessage("Seance Deleted Successfully");
        } catch (error) {
            console.error("Error response:", error.response);
            setErrorMessage("Failed to delete seance.");
        }
    };
    

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Delete Seance</h2>
            <div style={styles.details}>
                <label>
                    <strong>Seance ID:</strong>
                    <input
                        type="text"
                        value={seanceId}
                        onChange={(e) => setSeanceId(e.target.value)}
                        style={styles.input}
                    />
                </label>
                <button onClick={handleDelete} style={styles.button}>Delete Seance</button>
            </div>
            {errorMessage && <p className="error" style={styles.error}>{errorMessage}</p>}
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
    input: {
        marginLeft: '10px',
        padding: '5px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    button: {
        marginTop: '10px',
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        marginTop: '10px',
    },
};

export default DeleteSeance;