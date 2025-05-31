import React from 'react'
import Accueil from '../Acceuil.js'
import CreateUser from '../Users Management/CreateUser.js'
import FilmList from '../Film Management/FilmList.js'
import UtilisateurLogin from '../Users Management/UtilisateurLogin .js'
import SalleList from '../Salle Management/SallesList.js'
import GetAllSeance from '../Seance Management/GetAllSeances.js'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from 'react-router-dom'

function Menu() {
  const navStyle = {
    padding: '10px',
    backgroundColor: '#333',
    borderBottom: '1px solid #333'
  };

    const ulStyle = {
      listStyleType: 'none',
      padding: 0,
      display: 'flex',
      justifyContent: 'space-around'
    };

    const liStyle = {
      margin: '0 10px'
    };

    const linkStyle = {
      textDecoration: 'none',
      color: '#fff'
    };

  return (
      <nav style={navStyle}>
        <ul style={ulStyle}>
          <li style={liStyle}><Link to="/Accueil" style={linkStyle}>Accueil</Link></li>
          <li style={liStyle}><Link to="/UtilisateurLogin" style={linkStyle}>Se connecter</Link></li>
          <li style={liStyle}><Link to="/FilmList" style={linkStyle}>Liste des Films</Link></li>
          <li style={liStyle}><Link to="/SalleList" style={linkStyle}>Salle</Link></li>
          <li style={liStyle}><Link to="/GetAllSeances" style={linkStyle}>Seances</Link></li>
        </ul>
      </nav>
  )
}

export default Menu
