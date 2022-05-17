import { Component } from "react";
import {Link} from 'react-router-dom'
import './styles/VideogameCard.css'

export default class VideogameCard extends Component{
    constructor(props){
        super(props)
    }

    
    render(){
        return(
            <div className="videogame_cards">
                {this.props.hasOwnProperty("nombre")?
                <div className="game_card">
                    <div className="card_details">
                        <h2>{this.props.nombre}</h2>
                        <img src={this.props.imagen} alt="Imagen"/>
                        <div className="genres">
                            {this.props.generos.map((elem)=>{
                                return(<label>{elem.name}</label>)
                            })}
                        </div>
                        <label><Link to={`/videogames/videogame/${this.props.id}`} >Jugar ahora</Link></label>
                    </div>
                    <div className="game_buttons">
                        <img src="https://cdn-icons-png.flaticon.com/512/37/37434.png"/>
                        <img src="https://cdn-icons-png.flaticon.com/512/38/38462.png"/>
                    </div>
                </div>:
                <h1>Cargando card</h1>
                }
            </div> 
        )
    }
}

