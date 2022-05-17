import React,{Component} from "react";
import { Link } from "react-router-dom";
import './styles/LandingPage.css'

export default class LandingPage extends Component{
    render(){
        return(
            <div className="landing_page">
                <h1>Bienvenidos!!!</h1>
                <Link className="Link" to='/videogames'><button>{`>Entrar ahora`}</button></Link>
            </div>
        )
    }
}
