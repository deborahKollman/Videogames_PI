import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { useParams } from 'react-router-dom';
import { $CombinedState } from 'redux';
import { getVideogameDetail } from '../redux/actions';
import './styles/VideogameDetail.css'

export default function VideogameDetail(){
    const dispatch=useDispatch();
    const videogameDetail=useSelector(state=>state.videogameDetail)
    const params=useParams()
    useEffect(()=>{
        dispatch(getVideogameDetail(params.idVideogame))
        console.log(videogameDetail)
    },[])


    return (
        <div className='details_container' >
            {videogameDetail.hasOwnProperty("name")?
                <div className='game_details'>
                    <div className='game_title'>
                    <h1>{videogameDetail.name}</h1>
                    {params.idVideogame.length===36?<p>{videogameDetail.description}</p>:
                    <div dangerouslySetInnerHTML={{__html:`${videogameDetail.description}`}}></div>}
                    </div>
                    <div className='game_body'>
                        <img src={videogameDetail.image} alt="imagen" />
                        <div className='game_options'>
                        <p>Fecha de lanzamiento: {videogameDetail.released}</p>
                        <p>Rating: {videogameDetail.rating}</p>
                        <p>Generos</p>
                        <ul>{videogameDetail.genres.map((elem)=>{
                            return(<li>{elem.name}</li>)
                        })
                        }</ul>
                        <p>Plataformas:</p>
                        <ul>{videogameDetail.platforms.map((elem)=>{
                            return(<li>{elem.name}</li>)
                        })}
                        </ul>
                        </div>
                    </div>
                </div>:
                <h1>Cargando detalles</h1>
            }
        </div>
    )
}