import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateSeance = () => {
    const [schedule, setSchedule] = useState('');
    const [price, setPrice] = useState(0);
    const [seats, setSeats] = useState(0);
    const [hallProgId, setHallProgId] = useState('');
    const [salleProgList, setSalleProgList] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch SalleProg on component mount
    useEffect(() => {
        const fetchSalleProg = async () => {
            try {
                const response = await axios.get('http://localhost:8080/testV2/api/cinema/salleprog');
                setSalleProgList(response.data);
            } catch (error) {
                setErrorMessage(
                    error.response?.data || 'Error fetching salleprog data'
                );
            }
        };
        fetchSalleProg();
    }, []);

    // Submit form data
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure that schedule is in the correct ISO format with seconds
        let formattedSchedule = schedule;
        if (formattedSchedule.length === 16) {
            formattedSchedule += ":00"; // Add seconds if missing
        }

        // Send the data as query parameters
        try {
            const response = await axios.post(
            `http://localhost:8080/testV2/api/cinema/seances/create?horaire=${encodeURIComponent(formattedSchedule)}&tarif=${price}&places=${seats}&salleProgId=${hallProgId}`
            );
            setErrorMessage('Seance created successfully!');
        } catch (error) {
            setErrorMessage(error.response?.data || 'Error creating seance');
        }
    };

    const handleChange = (e) => {
        setSchedule(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <label htmlFor="schedule" style={styles.label}>Schedule:</label>
            <input
                type="datetime-local"
                id="schedule"
                value={schedule}
                onChange={handleChange}
                style={styles.input}
            />
            <p>{schedule}</p>

            <label htmlFor="price" style={styles.label}>Price:</label>
            <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={styles.input}
            />

            <label htmlFor="hallProgId" style={styles.label}>HallProgId:</label>
            <select
                id="hallProgId"
                value={hallProgId}
                onChange={(e) => setHallProgId(e.target.value)}
                style={styles.select}
            >
                <option value="" disabled>
                    -- Select a HallProg --
                </option>
                {salleProgList.map((salleProg) => (
                    <option key={salleProg.id_salleprog} value={salleProg.id_salleprog}>
                        {`Film: name:${salleProg.film.name} descr:(${salleProg.film.description}), 
                        Salle: name:${salleProg.salle.name} add:${salleProg.salle.address} (${salleProg.salle.capacite} seats)`}
                    </option>
                ))}
            </select>

            <label htmlFor="seats" style={styles.label}>Seats:</label>
            <input
                type="number"
                id="seats"
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
                style={styles.input}
            />

            <button type="submit" style={styles.button}>Create Seance</button>

            {errorMessage && <p className="error" style={styles.error}>{errorMessage}</p>}
        </form>
    );
};

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
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
    select: {
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
    error: {
        color: 'red',
        marginTop: '10px',
    },
};

export default CreateSeance;
