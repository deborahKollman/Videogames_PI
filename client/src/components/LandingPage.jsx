import React,{Component} from "react";
import { Link } from "react-router-dom";
import './styles/LandingPage.css'

export default class LandingPage extends Component{
    render(){
        return(
            <div className="landing_page">
                <p>Bienvenido a: Proyecto individual - Videogames </p>
                <Link className="Link" to='/videogames'><button>{`>Entrar ahora`}</button></Link>
            </div>
        )
    }
}
