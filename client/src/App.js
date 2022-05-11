import './App.css';
import React from 'react';
import { Route } from "react-router-dom";
import LandingPage from './components/LandingPage.js'
import NavBar from './components/NavBar.js'
import Home from './components/Home.js'
import VideogameCreate from './components/VideogameCreate.js'
import VideogameDetail from './components/VideogameDetail.js'

function App() {
  return (
    <div>
     <Route exact path='/' component={LandingPage}/> {/* Pagina inicial (Landing) */}
     <Route path='/videogames' component={NavBar}/> {/* NavBar */}
     <Route exact path='/videogames' component={Home}/>{/* Home */}
     <Route path='/videogames/:idVideogame' component={VideogameDetail}/> {/* Ruta detalle */}
     <Route path='/videogames/create' component={VideogameCreate}/> {/* Ruta creacion */}
    </div>
  );
}

export default App;
