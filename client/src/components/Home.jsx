import React,{ Component } from "react";
import {connect} from 'react-redux'
//import VideogameCard from './VideogameCard.js'
import {getAllVideogames} from '../redux/actions/index.js'

class Home extends Component(){
    

    componentDidMount(){
        this.props.getAllVideogames();
        console.log(this.props);
    }

    render(){
        return(
            <div>
                
            </div>
        )
    }
}

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