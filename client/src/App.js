import './App.css';
import React from 'react';
import { Route } from "react-router-dom";
import LandingPage from './components/LandingPage'
import NavBar from './components/NavBar.jsx'
import Home from './components/Home.jsx'
import VideogameCreate from './components/VideogameCreate.jsx'
import VideogameDetail from './components/VideogameDetail.jsx'
import About from './components/About.jsx'

function App() {
  return (
    <div className='App' >
      <Route exact path='/' render={()=>(<LandingPage/>)}/>{/* Home */}
     <Route path='/videogames' render={()=>(<NavBar/>)}/> {/* NavBar */}
     <Route exact path='/videogames' render={({match,location})=>(<Home match={match} location={location} />)}/>{/* Home */}
     <Route exact path='/videogames/videogame/:idVideogame' render={()=>(<VideogameDetail/>)}/> {/* Ruta detalle */}
     <Route exact path='/videogames/create' render={()=>(<VideogameCreate/>)}/> {/* Ruta creacion */}
     <Route exact path='/videogames/about' render={()=>(<About/>)} />
    </div>
  );
}

export default App;
