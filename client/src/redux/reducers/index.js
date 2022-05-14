import {GET_VIDEOGAMES, GET_VIDEOGAME_DETAIL, GET_GENRES, ADD_VIDEOGAME, SET_VIDEOGAME, SET_ERRORS, GET_VIDEOGAME_BY_NAME, FILTER_BY_GENRE, FILTER_BY_GAME, ORDER_BY_NAME, ORDER_BY_RATING} from '../action_defs/index.js'

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
        case(GET_VIDEOGAME_BY_NAME):{
            return{
                ...state,
                videogames:action.payload
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
                newVideogame:{name:"",description:"",rating:"",released:"",image:"",genres:[],platforms:[]},
                newVideogameErrors:{name:"",description:"",rating:"",released:"",image:"",genres:[],platforms:[]}
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
        case(FILTER_BY_GENRE):{
            const genre=action.payload;
            const games=[]
            state.videogames.forEach(elem=>{
                let esta=false;
                elem.genres.forEach(element => {
                    if(element.name===genre) esta=true
                });
                if(esta) games.push(elem)
            })
            return {
                ...state,
                videogames:games
            }
        }
        case(FILTER_BY_GAME):{
            const origin=action.payload; 
            var games=[]
            state.videogames.forEach(elem=>{
                if(origin==='made' && elem.id.length===36) games.push(elem) 
                if(origin==='api' && elem.id.length<36) games.push(elem)
            })
            return{
                ...state,
                videogames:games
            }

        }
        case(ORDER_BY_NAME):{
            let ordered;
            if(action.payload==='asc'){
                ordered=state.videogames.sort((a,b)=>{
                    return a.localeCompare(b)   
                })
            }else{
                ordered=state.videogames.sort((a,b)=>{
                    return b.localeCompare(a)    
                })
            }
            return{
                ...state,
                videogames:ordered
            }
        }
        case(ORDER_BY_RATING):{
            let ordered;
            if(action.payload==='asc'){
                ordered=state.videogames.sort((a,b)=>{
                    return a.rating - b.rating    
                })
            }else{
                ordered=state.videogames.sort((a,b)=>{
                    return b.rating - a.rating    
                })
            }
            return{
                ...state,
                videogames:ordered
            }
        }
        default:{
            return state
        }
    }
}

export default reducer;