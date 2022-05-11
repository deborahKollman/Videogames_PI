import {GET_VIDEOGAMES, GET_VIDEOGAME_DETAIL, GET_GENRES} from '../action_defs/index.js'

const initialState={
    videogames:[],
    videogameDetail:{},
    genres:[]
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
        default:{
            return state
        }
    }
}

export default reducer;