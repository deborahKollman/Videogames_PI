import { Component } from "react";
import {NavLink} from 'react-router-dom'
import './styles/VideogameCard.css'

export default class VideogameCard extends Component{
    constructor(props){
        super(props)
    }

    
    render(){
        return(
            <div className="game_card">
                {this.props.hasOwnProperty("nombre")?
                <div className="card_details">
                    <p><NavLink to={`/videogames/videogame/${this.props.id}`} activeClassName="current" exact >{this.props.nombre}</NavLink></p>
                    <img src={this.props.imagen} alt="Imagen"/>
                    <p>Generos:</p>
                    <ul>
                        {this.props.generos.map((elem)=>{
                            return(<li>{elem.name}</li>)
                        })}
                    </ul>
                </div>:
                <h1>Cargando card</h1>
                }
            </div> 
        )
    }
}

