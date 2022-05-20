import {GET_VIDEOGAMES,GET_GENRES,ADD_VIDEOGAME, SET_VIDEOGAME, SET_ERRORS,GET_VIDEOGAME_DETAIL, GET_VIDEOGAME_BY_NAME, ORDER_VIDEOGAMES, FILTER_VIDEOGAMES, FILTER_GENRES,SET_FILTER_ORDER} from '../action_defs/index.js'
import axios from 'axios'

export const getAllVideogames=()=>{
    return function(dispatch){
        return axios.get('/videogames')
        .then(response=>{dispatch({type:GET_VIDEOGAMES,payload:response.data})})
        .catch(err=>console.log(`ERROR: ${err.message}`))
    }
}


export const getVideogameDetail=(idVideogame)=>{
    return function(dispatch){
        return axios.get(`/videogame/${idVideogame}`)
        .then(response=>{dispatch({type:GET_VIDEOGAME_DETAIL,payload:response.data})})
        .catch(err=>console.log(`ERROR: ${err.message}`))
    }
}

export const getVideogamesByName=(name)=>{
    return function(dispatch){
        return axios.get(`/videogames?name=${name}`)
        .then(response=>{dispatch({type:GET_VIDEOGAME_BY_NAME,payload:response.data})})
        .catch(err=>console.log(`ERROR: ${err.message}`))
    }
}

export const getGenres=()=>{
    return function(dispatch){
        return axios.get('/genres')
        .then(response=>dispatch({type:GET_GENRES,payload:response.data}))
        
        .catch(err=>console.log(`ERROR: ${err.message}`))
        
    }
}

export const addVideogame=({name,description,image,released, rating,genres, platforms})=>{
    return function(dispatch){
        return axios.post('/videogame',
        {name,description,image,released, rating:parseFloat(rating), platforms,genres})
        .then(response=>dispatch({type:ADD_VIDEOGAME,payload:response}))
        .catch(response=>dispatch({type:ADD_VIDEOGAME,payload:response}))
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