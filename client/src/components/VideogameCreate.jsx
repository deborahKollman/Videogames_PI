import {getGenres} from '../redux/actions/index.js'

export default function VideogameCreate(){
    const dispatch=useDispatch(props);
    const genres=useSelector(state=>state.genres)
    React.useEffect(()=>{
        dispatch(getGenres())
    },[])
    return (
        <div>
            <h1>Crear videojuego</h1>
            <label>Nombre: </label><input/>
            <label>Descripcion: </label><input/>
            <label>Rating: </label><input/>
            <label>Fecha de lanzamiento: </label><input/>
            <label>Generos: </label>
                <select>
                    {genres.map((elem)=>{
                        return(<option value={elem.id}>{elem.name}</option>)
                    })}
                </select>
            <label>Plataformas: </label>
            <button>Agregar genero</button>
        </div>
    )
}