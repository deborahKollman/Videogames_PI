import {GET_VIDEOGAMES,GET_GENRES} from '../action_defs/index.js'
import axios from 'axios'

export const getAllVideogames=()=>{
    return function(dispatch){
        axios.get('http://localhost:3001/videogames')
        .then(response=>dispatch({type:GET_VIDEOGAMES,payload:response.data}))
        
        .catch(err=>console.log(`ERROR: ${err.message}`))
        
    }
    
}


export const getVideogameDetail=(idVideogame)=>{
    return function(dispatch){
        axios.get(`localhost:3001/videogame/${idVideogame}`)
        .then(response=>{
            dispatch({type:GET_VIDEOGAME_DETAIL,payload:response.data})
        })
        .catch(err=>console.log(`ERROR: ${err.message}`))
    }
}

export const getGenres=()=>{
    return function(dispatch){
        axios.get('http://localhost:3001/genres')
        .then(response=>dispatch({type:GET_GENRES,payload:response.data}))
        
        .catch(err=>console.log(`ERROR: ${err.message}`))
        
    }
}