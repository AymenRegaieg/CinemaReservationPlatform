import React, { useState } from "react";
import axios from "axios";

const UpdateSeance = () => {
    const [seanceId, setSeanceId] = useState("");
    const [schedule, setSchedule] = useState("");
    const [price, setPrice] = useState(0);
    const [seats, setSeats] = useState(0);
    const [hallProgId, setHallProgId] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Handle the form update submit
    const handleUpdate = async (e) => {
        e.preventDefault();

        // Ensure that schedule is in the correct ISO format with seconds
        let formattedSchedule = schedule;
        if (formattedSchedule.length === 16) {
            formattedSchedule += ":00"; // Add seconds if missing
        }

        // Validate that hallProgId is not empty
        if (!hallProgId) {
            setErrorMessage("Please select a HallProg.");
            return;
        }

        // Send the update via query parameters
        try {
            const response = await axios.put(
                `http://localhost:8080/testV2/api/cinema/seances/${seanceId}?horaire=${encodeURIComponent(formattedSchedule)}&tarif=${price}&places=${seats}&salleProgId=${hallProgId}`
            );
            setSuccessMessage("Seance updated successfully!");
            setErrorMessage("");  // Clear any previous errors
        } catch (error) {
            setErrorMessage("Failed to update the seance.");
            setSuccessMessage(""); // Clear any success messages on error
        }
    };

    return (
        
        <div style={styles.container}>
            <h2 style={styles.header}>Update Seance</h2>
            <form onSubmit={handleUpdate} style={styles.form}>
                <label style={styles.label}>Seance ID:</label>
                <input
                    type="text"
                    value={seanceId}
                    onChange={(e) => setSeanceId(e.target.value)}
                    required
                    style={styles.input}
                />
                <label style={styles.label}>Schedule:</label>
                <input
                    type="datetime-local"
                    value={schedule}
                    onChange={(e) => setSchedule(e.target.value)}
                    required
                    style={styles.input}
                />
                <label style={styles.label}>Price:</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    style={styles.input}
                />
                <label style={styles.label}>Seats:</label>
                <input
                    type="number"
                    value={seats}
                    onChange={(e) => setSeats(e.target.value)}
                    required
                    style={styles.input}
                />
                <label style={styles.label}>HallProg ID:</label>
                <input
                    type="text"
                    value={hallProgId}
                    onChange={(e) => setHallProgId(e.target.value)}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Update Seance</button>
            </form>

            {successMessage && <p className="success" style={styles.success}>{successMessage}</p>}
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
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    label: {
        marginBottom: '10px',
        width: '100%',
        maxWidth: '400px',
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

export default UpdateSeance;
