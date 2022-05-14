import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { useParams } from 'react-router-dom';
import { getVideogameDetail } from '../redux/actions';

export default function VideogameDetail(){
    const dispatch=useDispatch();
    const videogameDetail=useSelector(state=>state.videogameDetail)
    const params=useParams()
    useEffect(()=>{
        dispatch(getVideogameDetail(params.idVideogame))
        console.log(videogameDetail)
    },[])
    return (
        <div>
            {videogameDetail.hasOwnProperty("name")?
                <div>
                    <h1>{videogameDetail.name}</h1>
                    <img src={videogameDetail.image} alt="imagen" />
                    <p>Generos</p>
                    <ul>{videogameDetail.genres.map((elem)=>{
                        return(<li>{elem.name}</li>)
                    })
                    }</ul>
                    <p>Fecha de lanzamiento: {videogameDetail.released}</p>
                    <p>Rating: {videogameDetail.rating}</p>
                </div>:
                <h1>Cargando detalles</h1>
            }
            
            
        </div>
    )
}