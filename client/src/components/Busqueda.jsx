import { Component } from "react";
import VideogameCard from "./VideogameCard";
import './styles/Busqueda.css'

export default class Busqueda extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="cards">
                {this.props.hasOwnProperty("videogames") && this.props.videogames.map(elem=>{
                    return (<VideogameCard id={elem.id} nombre={elem.name} imagen={elem.image} generos={elem.genres} />)
                })}
            </div>
        )
    }
}