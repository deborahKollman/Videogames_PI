import {GET_VIDEOGAMES, GET_VIDEOGAME_DETAIL, GET_GENRES, ADD_VIDEOGAME, SET_VIDEOGAME, SET_ERRORS, GET_VIDEOGAME_BY_NAME, ORDER_VIDEOGAMES, FILTER_GENRES, FILTER_VIDEOGAMES, SET_FILTER_ORDER} from '../action_defs/index.js'

const initialState={
    videogames:[],
    videogameDetail:{},
    genres:[],
    newVideogame:{},
    newVideogameErrors:{},
    newVideogameMessage:"",
    videogamesFilteredOrdered:[],
    filterOrderTypes:{}
}


const reducer=(state=initialState,action)=>{
    switch(action.type){
        case(GET_VIDEOGAMES):{
            return {
                ...state,
                videogames:action.payload,
                videogamesFilteredOrdered:action.payload,
                filterOrderTypes:{filterGenre:'default',filterGame:'default',order:'default'}
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
                videogames:action.payload,
                videogamesFilteredOrdered:action.payload,
                filterOrderTypes:{filterGenre:'default',filterGame:'default',order:'default'}
            }
        }
        case(GET_GENRES):{
            return{
                ...state,
                genres:action.payload
            }
        }
        case(ADD_VIDEOGAME):{
            const errorStatus=404;
            if(action.payload.status===errorStatus){
                return{
                    ...state,
                    newVideogameMessage:action.payload.data.response
                }
            }else{
                return{
                    ...state,
                    newVideogame:{name:"",description:"",rating:"",released:"",image:"",genres:[],platforms:[]},
                    newVideogameErrors:{name:"",description:"",rating:"",released:"",image:"",genres:[],platforms:[]},
                    newVideogameMessage:action.payload.data
                }
            }
            
        }
        case(SET_VIDEOGAME):{
            return{
                ...state,
                newVideogame:action.payload,
                newVideogameMessage:""
            }
        }
        case(SET_ERRORS):{
            return{
                ...state,
                newVideogameErrors:action.payload,
                newVideogameMessage:""
            }
        }
        case(FILTER_VIDEOGAMES):{
            var oldState=state.filterOrderTypes
            oldState={...oldState,filterGame:action.payload}
            return{
                ...state,
                filterOrderTypes:oldState
            }
        }
        case(FILTER_GENRES):{
            let oldState=state.filterOrderTypes
            oldState={...oldState,filterGenre:action.payload}
            return{
                ...state,
                filterOrderTypes:oldState
            }
        }
        case(ORDER_VIDEOGAMES):{
            let oldState=state.filterOrderTypes
            oldState={...oldState,order:action.payload}
            return{
                ...state,
                filterOrderTypes:oldState
            }
        }
        case(SET_FILTER_ORDER):{
            var games=state.videogames.map(elem=>{return elem});
            if(state.filterOrderTypes.filterGenre!=="default"){
                games=games.filter((game)=>{
                    var hasGenre=false
                    game.genres.forEach((genre)=>{
                        if(genre.name===state.filterOrderTypes.filterGenre) hasGenre= true;
                    })
                    return hasGenre
                })
            }
            if(state.filterOrderTypes.filterGame!=="default"){
                games=games.filter((game)=>{
                   if(state.filterOrderTypes.filterGame==='made'){
                        return game.id.toString().length===36
                   }else{
                       return state.filterOrderTypes.filterGame==='api' && game.id.toString().length<36
                   }
                })
            }
            
            if(state.filterOrderTypes.order!=="default"){
                switch(state.filterOrderTypes.order){
                    case("alphabetic_des"):{
                        games=games.sort((a,b)=>{
                            if(a.name.toUpperCase() <b.name.toUpperCase()){return -1}
                            else if(a.name.toUpperCase()>b.name.toUpperCase()){return 1} 
                            else{return 0}
                        })
                        break;
                    }
                    case("alphabetic_asc"):{
                        games=games.sort((a,b)=>{
                           if(a.name.toUpperCase() <b.name.toUpperCase()){return 1}
                            else if(a.name.toUpperCase()>b.name.toUpperCase()){return -1} 
                            else{return 0}
                        })
                        break;
                    }
                    case("rating_asc"):{
                        games=games.sort((a,b)=>{
                            return a.rating - b.rating
                        })
                        break;
                    }
                    case("rating_des"):{
                        games=games.sort((a,b)=>{
                            return b.rating - a.rating
                        })
                        break;
                    }
                    default:;break;
                }
            }
            return{
                ...state,
                videogamesFilteredOrdered:games
            }
        }
        default:{
            return state
        }
    }
}

export default reducer;