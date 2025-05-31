import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ReserveSeat = () => {
  const location = useLocation();
  const getQueryParam = (param) => {
    const urlSearchParams = new URLSearchParams(location.search);
    return urlSearchParams.get(param);
  };
  const initialUserId = getQueryParam("userId");
  const [userId, setUserId] = useState(initialUserId || '');
  const [seances, setSeances] = useState([]);
  const [selectedSeance, setSelectedSeance] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchSeances = async () => {
      try {
        const seanceResponse = await axios.get('http://localhost:8080/testV2/api/cinema/seances');
        setSeances(seanceResponse.data);
      } catch {
        setErrorMessage('Failed to load seances.');
      }
    };

    fetchSeances();
  }, []);

  useEffect(() => {
    if (successMessage) {
        const timer = setTimeout(() => {
            setSuccessMessage('');
        }, 1000);
        return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:8080/cinemaManagement/api/cinema/seances/reserve?seance_id=${selectedSeance}&user_id=${userId}`
      );
      setSuccessMessage('Seat reserved successfully!');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('No seats available for this seance Or you don\'t have enough funds. Try another seance.');
      setSuccessMessage('');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Reserve a Seat</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Input field for user ID if not provided */}
        {!initialUserId && (
          <div className="form-group" style={styles.formGroup}>
            <label htmlFor="userIdInput" style={styles.label}>Enter User ID:</label>
            <input
              id="userIdInput"
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              style={styles.input}
              required
            />
          </div>
        )}

        {/* Dropdown list for selecting a seance */}
        <div className="form-group" style={styles.formGroup}>
          <label htmlFor="seanceSelect" style={styles.label}>Select a Seance:</label>
          <select
            id="seanceSelect"
            value={selectedSeance}
            onChange={(e) => setSelectedSeance(e.target.value)}
            style={styles.select} 
            required
          >
            <option value="" disabled>Select a Seance</option>
            {seances.map((seance) => (
              <option key={seance.id_seance} value={seance.id_seance}>
                {`Seance ID: ${seance.id_seance}, Horaire: ${seance.horaire}`}
              </option>
            ))}
          </select>
        </div>

        {/* Submit button */}
        <button type="submit" style={styles.submitButton}>
          Reserve Seat
        </button>
      </form>

      {successMessage && <p style={styles.successMessage}>{successMessage}</p>}
      {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginBottom: '20px',
  },
  formGroup: {
    textAlign: 'left',
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
    display: 'inline-block',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '100%',
  },
  select: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '100%',
    backgroundColor: '#fff',
    cursor: 'pointer',
  },
  submitButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  submitButtonHover: {
    backgroundColor: '#45a049',
  },
  successMessage: {
    color: 'green',
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
    fontWeight: 'bold',
  },
};

export default ReserveSeat;
