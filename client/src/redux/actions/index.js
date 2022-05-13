import {GET_VIDEOGAMES,GET_GENRES,ADD_VIDEOGAME, SET_VIDEOGAME, SET_ERRORS,GET_VIDEOGAME_DETAIL} from '../action_defs/index.js'
import axios from 'axios'

export const getAllVideogames=()=>{
    return function(dispatch){
        return axios.get('http://localhost:3001/videogames')
        .then(response=>{dispatch({type:GET_VIDEOGAMES,payload:response.data})})
        .catch(err=>console.log(`ERROR: ${err.message}`))
    }
}


export const getVideogameDetail=(idVideogame)=>{
    return function(dispatch){
        return axios.get(`http://localhost:3001/videogame/${idVideogame}`)
        .then(response=>{dispatch({type:GET_VIDEOGAME_DETAIL,payload:response.data})})
        .catch(err=>console.log(`ERROR: ${err.message}`))
    }
}

export const getGenres=()=>{
    return function(dispatch){
        return axios.get('http://localhost:3001/genres')
        .then(response=>dispatch({type:GET_GENRES,payload:response.data}))
        
        .catch(err=>console.log(`ERROR: ${err.message}`))
        
    }
}

export const addVideogame=(name,description,image,released, rating, platforms,genres)=>{
    return function(dispatch){
        return axios.post('http://localhost:3001/videogame',
        {name,description,image,released, rating, platforms,genres})
        .then(response=>dispatch({type:ADD_VIDEOGAME,payload:response.data}))
        .catch(err=>console.log(`ERROR: ${err.message}`))
    }
}

export const setVideogame=(videogame)=>{
    return {
        type:SET_VIDEOGAME, payload:videogame
    }
}

export const setVideogameErrors=(errors)=>{
    return{
        type:SET_ERRORS, payload:errors
    }
}