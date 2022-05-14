import React,{ Component } from "react";
import {connect} from 'react-redux'
import Pagination from './Pagination.jsx'
import {filterByGenre, filterByVideogame, getAllVideogames, getGenres, getVideogamesByName, orderByName, orderByRating} from '../redux/actions/index.js'
import Busqueda from "./Busqueda.jsx";

class Home extends Component{
    constructor(props){
        super(props);
        this.state={filter_type:"default",filter_option:"no_option",order_by:"default",order_asc_des:"asc"}
        this.handleFilterType=this.handleFilterType.bind(this)
        this.handleFilterOption=this.handleFilterOption.bind(this)
        this.handleOrderType=this.handleOrderType.bind(this)
        this.handleOrderAscDes=this.handleOrderAscDes.bind(this)
        this.handleSubmitFilter=this.handleSubmitFilter.bind(this)
        this.handleSubmitOrder=this.handleSubmitOrder.bind(this)
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

    handleFilterType(e){
        e.preventDefault();
        this.setState({...this.state,filter_type:e.target.options[e.target.selectedIndex].value}) 
    }

    handleFilterOption(e){
        e.preventDefault();
        this.setState({...this.state,filter_option:e.target.options[e.target.selectedIndex].value}) 
    }

    handleOrderType(e){
        e.preventDefault();
        this.setState({...this.state,order_by:e.target.options[e.target.selectedIndex].value}) 
    }

    handleOrderAscDes(e){
        e.preventDefault();
        this.setState({...this.state,order_asc_des:e.target.options[e.target.selectedIndex].value}) 
    }

    handleSubmitFilter(e){
        e.preventDefault()
        if(this.state.filter_option==='no_option') this.setState({...this.state,filter_type:"default"})
        switch(this.state.filter_type){
            case("genre"):{
                this.props.filterByGenre(this.state.filter_option);break;
            }
            case("game_type"):{
                this.props.filterByVideogame(this.state.filter_option);break;
            }
            default:
        }
    }

    handleSubmitOrder(e){
        e.preventDefault();
        if(this.state.filter_option==='no_option') this.setState({...this.state,filter_type:"default"})
        switch(this.state.order_by){
            case("alphabetic"):{
                this.props.orderByName(this.state.order_asc_des);break;
            }
            case("rating"):{
                this.props.orderByRating(this.state.order_asc_des);break;
            }
            default:
        }
        
    }


    render(){
        console.log("HOME",this.props.videogames)
        return(
            <div>
                {this.props.videogames.length!==0?
                <div>
                    <div>
                        <label>Filtrar por:</label>
                        <select onChange={this.handleFilterType}>
                            <option value="default">Sin filtro</option>
                            <option value="genre">Genero</option>
                            <option value="game_type">Tipo de videjuego</option>
                        </select>
                        {this.state.filter_type==='genre'?<div>
                        <label>Generos: </label>
                            <select onChange={this.handleFilterOption}>
                                {this.props.genres.map((elem)=>{
                                    return(<option value={elem.name} >{elem.name}</option>)
                                })}
                            </select>
                        </div>:<div></div>}
                        {this.state.filter_type==='game_type'?<div>
                            <label>Tipo de videjuegos:</label>
                            <select onChange={this.handleFilterOption}>
                                <option value='api'>Juegos existentes</option>
                                <option value="made">Juegos creados</option>
                            </select>
                        </div>:<div></div>
                        }
                        <button onClick={this.handleSubmitFilter}>Filtrar</button>
                    </div>
                    <div>
                        <label>Ordenar por:</label>
                        <select onChange={this.handleOrderType}>
                            <option value='default'>Sin orden</option>
                            <option value='alphabetic'>Orden alfabetico</option>
                            <option value='rating'>Rating</option>
                        </select>
                        {this.state.order_by!=='default'?<div>
                            <label>Orden:</label>
                            <select onChange={this.handleOrderAscDes}>
                                <option value='asc'>Ascendente</option>
                                <option value='des'>Descendente</option>
                            </select>
                        </div>:<div></div>}
                        <button onClick={this.handleSubmitOrder}>Ordenar</button>
                    </div>
                    {this.props.location.search===""?
                    <div>
                        <h1>Home</h1>
                        <Pagination videogames={this.props.videogames}/>
                    </div>:
                    <div>
                        <h1>Resultados de busqueda</h1>
                        <Busqueda videogames={this.props.videogames}/>
                    </div>}
                    
                </div>
                :<h1>Cargando</h1>}
            </div>
        )
    }
}


function mapStateToProps(state){
    return{
        ...this.props,
        videogames:state.videogames,
        genres:state.genres
    }
}

function mapDispatchToProps(dispatch){
    return{
        ...this.props,
        getAllVideogames: ()=>dispatch(getAllVideogames()),
        getVideogamesByName: (name)=>dispatch(getVideogamesByName(name)),
        getGenres: ()=>dispatch(getGenres()),
        filterByGenre:(genre)=>dispatch(filterByGenre(genre)),
        filterByVideogame:(game)=>dispatch(filterByVideogame(game)),
        orderByName:(order)=>dispatch(orderByName(order)),
        orderByRating:(order)=>dispatch(orderByRating(order))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)