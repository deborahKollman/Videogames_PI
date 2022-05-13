import {getGenres, setVideogame, setVideogameErrors} from '../redux/actions/index.js'
import {useDispatch,useSelector} from 'react-redux'
import { useEffect } from 'react';


export default function VideogameCreate(){
    const dispatch=useDispatch();
    
    const genres=useSelector(state=>state.genres)
    var newVideogame= useSelector(state=>state.newVideogame)
    const newVideogameErrors=useSelector(state=>state.newVideogameErrors)
    useEffect(()=>{
        dispatch(getGenres())
        dispatch(setVideogame({name:"",description:"",rating:0,released:"2020-02-02",image:"",genres:[]}))
    },[])

    var genreId=4;
    function handleInputChange(e){
        e.preventDefault()
        dispatch(setVideogame({...newVideogame,[e.target.name]:e.target.value}))
        console.log(newVideogame)
    }
    function handleSelectChange(e){
        e.preventDefault();
        genreId=parseInt(e.target.options[e.target.selectedIndex].value);
    }

    function handleSelectSubmit(e){
        e.preventDefault()
        const newVideogameGenres=newVideogame.genres
        const newGenre= genres.find(elem=>{
            return elem.id===genreId
        })
        newVideogameGenres.push(newGenre)
        console.log(newVideogameGenres)
        dispatch(setVideogame({...newVideogame,genres:newVideogameGenres}))
    }

    return (
        <div>
            <h1>Crear videojuego</h1>
            <label>Nombre: </label><input name='name' value={newVideogame.name} onChange={handleInputChange}/>
            <label>Descripcion: </label><input name='description' value={newVideogame.description} onChange={handleInputChange}/>
            <label>Rating: </label><input name='rating' value={newVideogame.rating} onChange={handleInputChange}/>
            <label>Fecha de lanzamiento: </label><input name='released' value={newVideogame.released} onChange={handleInputChange}/>
            <label>Imagen(URL): </label><input name='image' value={newVideogame.image} onChange={handleInputChange}/>
            <form >
                <label>Generos: </label>
                    <select onChange={handleSelectChange}>
                        {genres.map((elem)=>{
                            return(<option value={elem.id} >{elem.name}</option>)
                        })}
                    </select>
                <button type='submit' onClick={handleSelectSubmit}>Agregar genero</button>
            </form>
            {newVideogame.hasOwnProperty("genres")?
            <ul>
            {newVideogame.genres.map((elem)=><li>{elem.name}</li>)}
        </ul>:<div/>
            }
            
            <label>Plataformas: </label>
        </div>
    )
}

function validate(input){
    let errors={};
    if(!input.name) errors.name='Nombre requerido'
    if(!input.description) errors.description='Descripcion requerida'
    if(input.rating>5) errors.rating='El maximo rating es 5'
    if(input.rating<0) errors.rating='El minimo rating es 0'
    if(input.image){
        if(typeof input.image!=='string' || input.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) !== null){
            errors.image='URL incorrecto, debe ser una imagen'
        }
    }
    return errors
}