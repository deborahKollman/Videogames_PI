import { Component } from "react";
import {Link} from 'react-router-dom'
import './styles/VideogameCard.css'
import right from '../img/console_right.png'
import left from '../img/console_left.png'

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
                        <p>{this.props.nombre}</p>
                        <img src={this.props.imagen} alt="Imagen"/>
                        <div className="genres">
                            {this.props.generos.map((elem)=>{
                                return(<label>{`>${elem.name}`}</label>)
                            })}
                        </div>
                        <Link to={`/videogames/videogame/${this.props.id}`} className="enter_game"><label >Entrar ahora</label></Link>
                    </div>
                    <div className="game_buttons">
                        <img alt="left" src={left}/>
                        <img alt="right" src={right}/>
                    </div>
                </div>:
                <h1>Cargando card</h1>
                }
            </div> 
        )
    }
}

