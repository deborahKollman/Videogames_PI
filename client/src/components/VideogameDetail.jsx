import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { useParams } from 'react-router-dom';
import { $CombinedState } from 'redux';
import { getVideogameDetail } from '../redux/actions';
import './styles/VideogameDetail.css'
import './styles/Home.css'

export default function VideogameDetail(){
    const dispatch=useDispatch();
    const videogameDetail=useSelector(state=>state.videogameDetail)
    const params=useParams()
    useEffect(()=>{
        dispatch(getVideogameDetail(params.idVideogame))
    },[])


    return (
        <div className='details_container' >
            {videogameDetail.hasOwnProperty("name")?
                <div className='game_details'>
                    <div className='game_title'>
                    <h1>{videogameDetail.name}</h1>
                    <img src={videogameDetail.image} alt="imagen" />
                        
                    </div>
                    <div className='game_body'>
                        <div className='game_description'>
                        <h2>Acerca de</h2>
                        {params.idVideogame.length===36?<p>{videogameDetail.description}</p>:
                        <div dangerouslySetInnerHTML={{__html:`${videogameDetail.description}`}}></div>}
                        </div>
                        <div className='game_options'>
                        <p>Fecha de lanzamiento: {videogameDetail.released}</p>
                        <p>Rating: {videogameDetail.rating}</p>
                        <p>Generos:</p>
                        <ul>{videogameDetail.genres.map((elem)=>{
                            return(<li>{elem.name}</li>)
                        })
                        }</ul>
                        <p>Plataformas:</p>
                        <ul>{videogameDetail.platforms.map((elem)=>{
                            return(<li>{elem.platform.name}</li>)
                        })}
                        </ul>
                        </div>
                    </div>
                </div >:
                <div className='loading'><h1>Cargando videojuego</h1></div>
            }
        </div>
    )
}