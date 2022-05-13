import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { getVideogameDetail } from '../redux/actions';

export default function VideogameDetail(){
    const dispatch=useDispatch();
    const videogameDetail=useSelector(state=>state.videogameDetail)
    useEffect(()=>{
        dispatch(getVideogameDetail("ea98fde0-4950-468f-9505-89a4dc5384cd"))
        console.log(videogameDetail)
    },[])
    return (
        <div>
            {videogameDetail.hasOwnProperty("name")?
                <div>
                    <h1>{videogameDetail.name}</h1>
                    <img src={videogameDetail.image} alt="imagen" />
                    <ul>{videogameDetail.genres.map((elem)=>{
                        return(<li>{elem.name}</li>)
                    })
                    }</ul>
                    <p>{videogameDetail.released}</p>
                    <p>{videogameDetail.rating}</p>
                </div>:
                <h1>Cargando detalles</h1>
            }
            
            
        </div>
    )
}