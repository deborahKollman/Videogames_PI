import React, { useState } from "react";
import {NavLink, Link} from 'react-router-dom'
import './styles/NavBar.css'

export default function NavBar() {
    const [state,setState]=useState("");

    function handleInputChange(e){
        e.preventDefault();
        setState(e.target.value);
    }

    
    return(
        <nav className="nav_bar">
            <div className="links">
                <NavLink to='/videogames' activeClassName="selected" exact>Home</NavLink>
                <label>|</label>
                <NavLink to='/videogames/create' activeClassName="selected" exact>Crear</NavLink>
                <label>|</label>
                <NavLink to='/videogames/about'  activeClassName="selected" exact>Acerca de</NavLink>
            </div>
            <div className="buscador">
                <input value={state} placeholder="Buscar por nombre" onChange={handleInputChange}/>
                <Link to={`/videogames?name=${state}`} ><button  disabled={state===""?true:false}>Buscar</button></Link>
            </div>
        </nav>
    )
    
    
}