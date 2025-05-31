import React from "react";
import { useLocation } from "react-router-dom";

const FilmDetails = () => {
  const location = useLocation();
  const { film } = location.state || {}; // Access the passed film object

  if (!film) {
    return <p>No film data available. Please navigate from the Film List.</p>;
  }

  return (
    <div>
      <h2>Film Details</h2>
      <p>
        <strong>Name:</strong> {film.name}
      </p>
      <p>
        <strong>Description:</strong> {film.description}
      </p>
    </div>
  );
};

export default FilmDetails;
