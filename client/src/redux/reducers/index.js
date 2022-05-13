import {GET_VIDEOGAMES, GET_VIDEOGAME_DETAIL, GET_GENRES, ADD_VIDEOGAME, SET_VIDEOGAME, SET_ERRORS} from '../action_defs/index.js'

const initialState={
    videogames:[],
    videogameDetail:{},
    genres:[],
    newVideogame:{},
    newVideogameErrors:{}
}


const reducer=(state=initialState,action)=>{
    switch(action.type){
        case(GET_VIDEOGAMES):{
            return {
                ...state,
                videogames:action.payload
            }
        }
        case(GET_VIDEOGAME_DETAIL):{
            return{
                ...state,
                videogameDetail:action.payload
            }
        }
        case(GET_GENRES):{
            return{
                ...state,
                genres:action.payload
            }
        }
        case(ADD_VIDEOGAME):{
            return{
                ...state,
                videogames:state.videogames.push(action.payload)
            }
        }
        case(SET_VIDEOGAME):{
            return{
                ...state,
                newVideogame:action.payload
            }
        }
        case(SET_ERRORS):{
            return{
                ...state,
                newVideogameErrors:action.payload
            }
        }
        default:{
            return state
        }
    }
}

export default reducer;