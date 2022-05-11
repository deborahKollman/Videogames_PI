import React,{ Component } from "react";
import {NavLink} from 'react-router-dom'

export default class NavBar extends Component{
    render(){
        return(
            <div>
                <div>
                    <NavLink>Home</NavLink>
                    <NavLink>Create</NavLink>
                </div>
                <div>
                    <input/>
                    <button>Buscar</button>
                </div>
            </div>
        )
    }
}