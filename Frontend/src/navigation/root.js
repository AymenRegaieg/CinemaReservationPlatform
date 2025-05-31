import React from 'react'
import Accueil from '../Acceuil.js'
import CreateUser from '../Users Management/CreateUser.js'
import FilmList from '../Film Management/FilmList.js'
import UtilisateurLogin from '../Users Management/UtilisateurLogin .js'
import SalleList from '../Salle Management/SallesList.js'
import AddSalle from '../Salle Management/AddSalle.js'
import  GetAllSeance from '../Seance Management/GetAllSeances.js'
import CreatSeance from '../Seance Management/CreateSeance.js'
import UpdateSeance from '../Seance Management/UpdateSeance.js'
import DeleteSeance from '../Seance Management/DeleteSeance.js'
import CreateFilm from '../Film Management/CreateFilm.js'
import ReserveSeat from '../Seance Management/ReserveSeat.js'
import Menu from './menu.js'
import {
  BrowserRouter as Router,  
  Route,
  Link,
  Routes
} from 'react-router-dom'



function Root() {

  return (
         <div>
        <Menu />
        <div> 
        <Routes>
          <Route path='/Accueil' element={<Accueil/>}/>
          <Route path='/createUser' element={<CreateUser/>}/>
          <Route path='/utilisateurLogin' element={<UtilisateurLogin/>}/>
          <Route path='/FilmList' element={<FilmList/>}/>
          <Route path='/SalleList' element={<SalleList/>}/>
          <Route path='/salle/add' element={<AddSalle/>}/>
          <Route path='/ReserveSeat' element={<ReserveSeat/>}/>
          <Route path='/GetAllSeances' element={<GetAllSeance/>}/>
          <Route path='/create-seance' element={<CreatSeance/>}/>
          <Route path='/UpdateSeance' element={<UpdateSeance/>}/>
          <Route path='/DeleteSeance' element={<DeleteSeance/>}/>
          <Route path='/CreateFilm' element={<CreateFilm/>}/>
          <Route path='/' element={<Accueil/>}/>
        </Routes>
        </div>
        </div>

        
  )
  
}

export default Root
