import React,{Component} from "react";
import { Link } from "react-router-dom";
import './styles/LandingPage.css'

export default class LandingPage extends Component{
    render(){
        return(
            <div className="landing_page">
                <h1>Bienvenidos!!!</h1>
                <p>Preparados, listos...</p>
                <button><Link className="Link" to='/videogames'>A jugar</Link></button>
            </div>
        )
    }
}
