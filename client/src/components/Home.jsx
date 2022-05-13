import React,{ Component } from "react";
import {connect} from 'react-redux'
import VideogameCard from './VideogameCard.jsx'
import {getAllVideogames} from '../redux/actions/index.js'

class Home extends Component{
    componentDidMount(){
        this.props.getAllVideogames();
    }
    
    render(){
        return(
            <div>
                {this.props.videogames.length!==0?
                <div>
                    <h1>Home</h1>
                    <VideogameCard id={this.props.videogames[0].id} nombre={this.props.videogames[0].name} imagen={this.props.videogames[0].image} generos={this.props.videogames[0].genres}   />
                </div>
                
                :<h1>Cargando</h1>}
            </div>
        )
    }
}
{/* <VideogameCard nombre={this.props.videogames[0].name} imagen={this.props.videogames[0].image} generos={this.props.videogames[0].genres}   /> */}

function mapStateToProps(state){
    
    return{
        videogames:state.videogames
    }
}

function mapDispatchToProps(dispatch){
    return{
        getAllVideogames: ()=>dispatch(getAllVideogames())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)