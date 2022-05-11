import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { getVideogameDetail } from '../redux/actions';

export default function VideogameDetail(){
    const dispatch=useDispatch(props);
    const videogame=useSelector(state=>state.videogameDetail)
    React.useEffect(()=>{
        dispatch(getVideogameDetail(props.match.params.idVideogame))
    },[])

    return (
        <div>
            <h1>{videogame.name}</h1>
            <img src={videogame.image}/>
            <ul>{videogame.genres.map((elem)=>{
                return <li>{elem.name}</li>
            })}</ul>
            <p>{videogame.released}</p>
            <p>{videogame.rating}</p>
            <ul>{videogame.platforms.map((elem)=>{
                return <li>{elem.name}</li>
            })}</ul>
        </div>
    )
}