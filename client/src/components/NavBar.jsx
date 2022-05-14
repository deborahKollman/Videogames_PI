import React, { useState } from "react";
import {NavLink, Link} from 'react-router-dom'

export default function NavBar() {
    const [state,setState]=useState("");

    function handleInputChange(e){
        e.preventDefault();
        setState(e.target.value);
    }

    
    return(
        <nav>
            <div>
                <NavLink to='/videogames'>Home</NavLink>
                <NavLink to='/videogames/create'>Create</NavLink>
            </div>
            <div>
                <input value={state} onChange={handleInputChange}/>
                <button ><Link to={`videogames?name=${state}`} >Buscar</Link></button>
            </div>
        </nav>
    )
    
    
}