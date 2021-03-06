import React,{ Component } from "react";
import {connect} from 'react-redux'
import Pagination from './Pagination.jsx'
import { getAllVideogames, getGenres, getVideogamesByName, filterVideogames,filterGenre, orderVideogames, filterOrder} from '../redux/actions/index.js'
import Busqueda from "./Busqueda.jsx";
import './styles/Home.css'
import loading from '../img/loading.gif'
import no_game from '../img/game_over.png'

class Home extends Component{
    constructor(props){
        super(props);
        this.handleFilterGenre=this.handleFilterGenre.bind(this);
        this.handleFilterGame=this.handleFilterGame.bind(this);
        this.handleOrder=this.handleOrder.bind(this)
    }

    componentDidMount(){
        this.props.getGenres()
        if(this.props.hasOwnProperty("location")&& this.props.location.search!==""){
            const name=this.props.location.search.slice(this.props.location.search.indexOf("=")+1)
            this.props.getVideogamesByName(name);
        }else{
            this.props.getAllVideogames();
        }
    }

    componentDidUpdate(prevProps){
        if(this.props.location.search!==prevProps.location.search ){
            if(this.props.hasOwnProperty("location")&& this.props.location.search!==""){
                const name=this.props.location.search.slice(this.props.location.search.indexOf("=")+1)
                this.props.getVideogamesByName(name);
            }else{
                this.props.getAllVideogames();
            }
        }

    }

    handleFilterGenre(e){
        e.preventDefault();
        this.props.filterGenre(e.target.options[e.target.selectedIndex].value)
        this.props.filterOrder()
    }

    handleFilterGame(e){
        e.preventDefault();
        this.props.filterVideogames(e.target.options[e.target.selectedIndex].value)
        this.props.filterOrder()
    }

    handleOrder(e){
        e.preventDefault();
        this.props.orderVideogames(e.target.options[e.target.selectedIndex].value)
        this.props.filterOrder()
    }

    render(){
        return(
            <div className="home_page">
                {(this.props.videogames.length!==0 || this.props.location.search!=="")?
                <div>
                    <div className="home_options">
                        <div className="home_title">
                        {this.props.location.search===""?<div><h1>Henry Videogames</h1><p>{`Mostrando ${this.props.videogamesFilteredOrdered.length} resultados`}</p></div>
                        :<p>{`Resultados de busqueda para '${this.props.location.search.slice(this.props.location.search.indexOf("=")+1)}': ${this.props.videogamesFilteredOrdered.length} resultados`}</p>}
                        </div>
                        <div className="filter_order_options">
                            <div>
                                <label>Filtrar por genero: </label>
                                    <select onChange={this.handleFilterGenre}>
                                        <option value='default'>Todos los generos</option>
                                        {this.props.genres.map((elem)=>{
                                            return(<option value={elem.name} >{elem.name}</option>)
                                        })}
                                    </select>
                            </div>
                            <div>
                                <label>Filtrar por tipo de videjuegos:</label>
                                <select onChange={this.handleFilterGame}>
                                    <option value='default'>Todos los videojuegos</option>
                                    <option value='api'>Juegos existentes</option>
                                    <option value="made">Juegos creados</option>
                                </select>
                            </div>
                            <div>
                                <label>Ordenar por:</label>
                                <select onChange={this.handleOrder}>
                                    <option value='default'>Sin orden</option>
                                    <option value ="alphabetic_des">A-Z</option>
                                    <option value='alphabetic_asc'>Z-A</option>
                                    <option value="rating_asc">Rating mas bajo</option>
                                    <option value='rating_des'>Rating mas alto</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {this.props.videogamesFilteredOrdered.length!==0?
                    <div>
                        {this.props.location.search===""?
                        <div>
                            <Pagination videogames={this.props.videogamesFilteredOrdered}/>
                        </div>:
                        <div>
                            <Busqueda videogames={this.props.videogamesFilteredOrdered}/>
                        </div>}
                    </div>
                    :<div className="no_games">No se encontraron resultados<img src={no_game}/></div>}
                </div>
                :<div className="loading"><h1>Cargando</h1><img alt="cargando" src={loading} /></div>}
            </div>
        )
    }
}


function mapStateToProps(state){
    return{
        ...this.props,
        videogames:state.videogames,
        videogamesFilteredOrdered:state.videogamesFilteredOrdered,
        filterOrderTypes:state.filterOrderTypes,
        genres:state.genres
    }
}

function mapDispatchToProps(dispatch){
    return{
        ...this.props,
        getAllVideogames: ()=>dispatch(getAllVideogames()),
        getVideogamesByName: (name)=>dispatch(getVideogamesByName(name)),
        getGenres: ()=>dispatch(getGenres()),
        filterVideogames:(filter)=>dispatch(filterVideogames(filter)),
        filterGenre:(filter)=>dispatch(filterGenre(filter)),
        orderVideogames:(order)=>dispatch(orderVideogames(order)),
        filterOrder:()=>dispatch(filterOrder())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)