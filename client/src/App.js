import './App.css';
import React from 'react';
import { Route } from "react-router-dom";
import LandingPage from './components/LandingPage'
import NavBar from './components/NavBar.jsx'
import Home from './components/Home.jsx'
import VideogameCreate from './components/VideogameCreate.jsx'
import VideogameDetail from './components/VideogameDetail.jsx'

function App() {
  return (
    <div>
      <Route exact path='/' render={()=>(<LandingPage/>)}/>{/* Home */}
     <Route path='/videogames' render={()=>(<NavBar/>)}/> {/* NavBar */}
     <Route exact path='/videogames' render={()=>(<Home/>)}/>{/* Home */}
     <Route exact path='/videogame/:idVideogame' render={()=>(<VideogameDetail/>)}/> {/* Ruta detalle */}
     <Route path='/videogames/create' render={()=>(<VideogameCreate/>)}/> {/* Ruta creacion */}
    </div>
  );
}

export default App;
