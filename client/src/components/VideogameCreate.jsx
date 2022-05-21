import {addVideogame, getGenres, setVideogame, setVideogameErrors} from '../redux/actions/index.js'
import {useDispatch,useSelector} from 'react-redux'
import { useEffect } from 'react';
import './styles/VideogameCreate.css'


export default function VideogameCreate(){
    const dispatch=useDispatch();
    const platforms=["PC","Playstation","Xbox","Nintendo Switch","iOS","Android","Nintendo 3DS","MacOs","Linux","PSP","Wii","GameCube","Nintendo 64","Game Boy","Atari","Sega","Dreamcast"]
    const genres=useSelector(state=>state.genres)
    const newVideogame= useSelector(state=>state.newVideogame)
    const newVideogameErrors=useSelector(state=>state.newVideogameErrors)
    const newVideogameMessage=useSelector(state=>state.newVideogameMessage)
    useEffect(()=>{
        dispatch(getGenres())
        dispatch(setVideogame({name:"",description:"",rating:"",released:"",image:"",genres:[],platforms:[]}))
        dispatch(setVideogameErrors({name:"",description:"",rating:"",released:"",image:"",genres:[],platforms:[]}))
    },[])

    var genreId=4;
    function handleInputChange(e){
        e.preventDefault()
        dispatch(setVideogame({...newVideogame,[e.target.name]:e.target.value}))
        dispatch(setVideogameErrors(validate({...newVideogame,[e.target.name]:e.target.value})))
        
    }
    function handleSelectGenre(e){
        e.preventDefault();
        genreId=parseInt(e.target.options[e.target.selectedIndex].value);
    }

    function handleSubmitGenre(e){
        e.preventDefault()
        const newVideogameGenres=newVideogame.genres
        const newGenre= genres.find(elem=>{
            return elem.id===genreId
        })
        let esta=false;
        newVideogameGenres.forEach((elem)=>{
            if(elem.id===newGenre.id) esta=true
        })
        if(!esta){
            newVideogameGenres.push(newGenre)
            dispatch(setVideogame({...newVideogame,genres:newVideogameGenres}))
            dispatch(setVideogameErrors(validate({...newVideogame,genres:newVideogameGenres})))
        }
    }
    var platformId=0;
    function handleSelectPlatform(e){
        e.preventDefault();
        platformId=parseInt(e.target.options[e.target.selectedIndex].value);
    }

    function handleSubmitPlatform(e){
        e.preventDefault()
        const newVideogamePlatforms=newVideogame.platforms
        const newPlatform= platforms[platformId]
        let esta=false;
        newVideogamePlatforms.forEach(elem=>{
            if(elem.platform.name===newPlatform) esta=true
        })
        if(!esta){
            newVideogamePlatforms.push({platform:{name:newPlatform}})
            dispatch(setVideogame({...newVideogame,platforms:newVideogamePlatforms}))
            dispatch(setVideogameErrors(validate({...newVideogame,platforms:newVideogamePlatforms})))
        }
    }

    function handleSubmitVideogame(e){
        e.preventDefault();
        
        dispatch(addVideogame(newVideogame))
    }
    
    return (
        <div className='create'>
            <h1>Crea tu propio videojuego</h1>
            <div className='create_options'><label>Nombre: </label><input name='name' value={newVideogame.name} onChange={handleInputChange}/>{newVideogameErrors.hasOwnProperty("name")&&<label className='create_errors'>{`${newVideogameErrors.name}`}</label>} </div>
            <div className='create_options'><label>Descripcion: </label><input name='description' value={newVideogame.description} onChange={handleInputChange}/>{newVideogameErrors.hasOwnProperty("description")&&<label className='create_errors'>{`${newVideogameErrors.description}`}</label >} </div>
            <div className='create_options'><label>Rating: </label><input name='rating' value={newVideogame.rating} onChange={handleInputChange}/>{newVideogameErrors.hasOwnProperty("rating")&&<label className='create_errors'>{`${newVideogameErrors.rating}`}</label >} </div>
            <div className='create_options'><label>Fecha de lanzamiento: </label><input name='released' value={newVideogame.released} onChange={handleInputChange}/>{newVideogameErrors.hasOwnProperty("released")&&<label className='create_errors'>{`${newVideogameErrors.released}`}</label >} </div>
            <div className='create_options'><label>Imagen(URL): </label><input name='image' value={newVideogame.image} onChange={handleInputChange}/>{newVideogameErrors.hasOwnProperty("image")&&<label className='create_errors'>{`${newVideogameErrors.image}`}</label >} </div>
            <div className='create_options'>
                <label>Generos: </label>
                    <select onChange={handleSelectGenre}>
                        {genres.map((elem)=>{
                            return(<option value={elem.id} >{elem.name}</option>)
                        })}
                    </select>
                <button type='submit' onClick={handleSubmitGenre}>Agregar genero</button>
                {newVideogameErrors.hasOwnProperty("genres")&&<label className='create_errors'>{`${newVideogameErrors.genres}`}</label >} 
            
            {newVideogame.hasOwnProperty("genres")?
            <div className='create_lists'>
            {newVideogame.genres.map((elem)=><label>{elem.name}</label>)}
            </div>:<div/>
            }
            </div>
            <div className='create_options'>
            <label>Plataformas: </label>
            <select onChange={handleSelectPlatform}>
                        {platforms.map((elem,index)=>{
                            return(<option value={index} >{elem}</option>)
                        })}
                    </select>
            <button type='submit' onClick={handleSubmitPlatform}>Agregar plataforma</button>
            {newVideogameErrors.hasOwnProperty("platforms")&&<label className='create_errors'>{`${newVideogameErrors.platforms}`}</label >} 
            
            {newVideogame.hasOwnProperty("platforms")?
            <div className='create_lists'>
            {newVideogame.platforms.map((elem)=><label>{elem.platform.name}</label>)}
            </div>:<div/>
            }
            </div>
            <div className='created'>
            <button className='create_button' disabled={Object.values(newVideogameErrors).length?true:false} onClick={handleSubmitVideogame} >Crear videojuego</button>
            {newVideogameMessage!=="" && <label className='create_message' >{`${newVideogameMessage}`}</label>}
            </div>
        </div>
    )
}

function validate(input){
    let errors={};
    if(!input.name) errors.name='Nombre requerido'
    if(!input.description) errors.description='Descripcion requerida'
    if(input.rating && isNaN(parseFloat(input.rating)) || input.rating>5 || input.rating<0) errors.rating ='El rating debe ser un numero entre 0 y 5'
    if(input.image){
        if(typeof input.image!=='string' || input.image.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) === null){
            errors.image='URL incorrecto, debe ser una imagen'
        }
    }
    if(input.released && input.released.match(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)===null) errors.released="La fecha debe tener formato AAAA-MM-DD"
    if(input.platforms.length===0) errors.platforms="Debe agregarse al menos una plataforma"
    return errors
}