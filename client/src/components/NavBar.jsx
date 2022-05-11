import React,{ Component } from "react";
import {NavLink} from 'react-router-dom'

export default class NavBar extends Component{
    render(){
        return(
            <nav>
                <div>
                    <NavLink to='/videogames'>Home</NavLink>
                    <NavLink to='/videogames/create'>Create</NavLink>
                </div>
                <div>
                    <input/>
                    <button>Buscar</button>
                </div>
            </nav>
        )
    }
}