import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SalleProgList = () => {
    const [salleProgList, setSalleProgList] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSalleProgList = async () => {
            try {
                const response = await axios.get('http://localhost:8080/testV2/api/cinema/salleprog');
                setSalleProgList(response.data);
            } catch (err) {
                setError('Failed to retrieve SalleProg list.');
            }
        };
        fetchSalleProgList();
    }, []);

    return (
        <div>
            <h2>SalleProg List</h2>
            {error && <p className="error">{error}</p>}
            <ul>
                {salleProgList.map((prog) => (
                    <li key={prog.id_salleprog}>
                        Film: {prog.film.name} ({prog.film.description}) - Salle: {prog.salle.name} ({prog.salle.capacite} seats)
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SalleProgList;
