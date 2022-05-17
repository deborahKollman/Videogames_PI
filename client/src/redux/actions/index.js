import {GET_VIDEOGAMES,GET_GENRES,ADD_VIDEOGAME, SET_VIDEOGAME, SET_ERRORS,GET_VIDEOGAME_DETAIL, GET_VIDEOGAME_BY_NAME, ORDER_VIDEOGAMES, FILTER_VIDEOGAMES, FILTER_GENRES,SET_FILTER_ORDER} from '../action_defs/index.js'
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

export const getVideogamesByName=(name)=>{
    return function(dispatch){
        return axios.get(`http://localhost:3001/videogames?name=${name}`)
        .then(response=>{dispatch({type:GET_VIDEOGAME_BY_NAME,payload:response.data})})
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

export const addVideogame=({name,description,image,released, rating,genres, platforms})=>{
    return function(dispatch){
        return axios.post('http://localhost:3001/videogame',
        {name,description,image,released, rating:parseFloat(rating), platforms,genres})
        .then(response=>dispatch({type:ADD_VIDEOGAME,payload:response.data}))
        .catch(err=>dispatch({type:ADD_VIDEOGAME,payload:`ERROR: ${err.message}`}))
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

export const filterVideogames=(filter)=>{
    return{
        type:FILTER_VIDEOGAMES, payload:filter
    }
}

export const filterGenre=(filter)=>{
    return{
        type:FILTER_GENRES, payload:filter
    }
}

export const orderVideogames=(order)=>{
    return{
        type:ORDER_VIDEOGAMES, payload:order
    }
}

export const filterOrder=()=>{
    return{
        type:SET_FILTER_ORDER, payload:""
    }
}