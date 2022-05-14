import {GET_VIDEOGAMES,GET_GENRES,ADD_VIDEOGAME, SET_VIDEOGAME, SET_ERRORS,GET_VIDEOGAME_DETAIL, GET_VIDEOGAME_BY_NAME, FILTER_BY_GENRE, FILTER_BY_GAME, ORDER_BY_NAME, ORDER_BY_RATING} from '../action_defs/index.js'
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

export const filterByGenre=(genre)=>{
    return{
        type:FILTER_BY_GENRE, payload:genre
    }
}

export const filterByVideogame=(origin)=>{
    return{
        type:FILTER_BY_GAME, payload:origin
    }
}

export const orderByName=(asc_des)=>{
    return{
        type:ORDER_BY_NAME, payload:asc_des
    }
}

export const orderByRating=(asc_des)=>{
    return{
        type:ORDER_BY_RATING, payload:asc_des
    }
}