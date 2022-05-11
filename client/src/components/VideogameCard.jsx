import { Component } from "react";

export default class VideogameCard extends Component(props){
    
    render(){
        return(
           <div>
               <p>{props.nombre}</p>
               <img src={props.imagen}/>
               <ul>
                   {props.genres.map((elem)=>{
                       return (<li>{elem.name}</li>)
                   })}
               </ul>
           </div> 
        )
    }
}

