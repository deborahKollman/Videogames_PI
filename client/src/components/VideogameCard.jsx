import { Component } from "react";
import {Link} from 'react-router-dom'

export default class VideogameCard extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
           <div>
               {this.props.hasOwnProperty("nombre")?
               <div>
                   <p><Link to={`/videogames/videogame/${this.props.id}`} >{this.props.nombre}</Link></p>
               <img src={this.props.imagen} alt="Imagen" />
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

