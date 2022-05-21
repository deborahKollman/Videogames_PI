import React,{Component} from "react";
import VideogameCard from "./VideogameCard";
import './styles/Pagination.css';
import './styles/Busqueda.css'


export default class Pagination extends Component{
    constructor(props){
        super(props)
        this.state={currentPage:0}
        this.nextPage=this.nextPage.bind(this)
        this.prevPage=this.prevPage.bind(this)
    }

    prevPage(e){
        e.preventDefault();
        this.setState({...this.state,currentPage:this.state.currentPage-1})
    }

    nextPage(e){
        e.preventDefault();
        this.setState({...this.state,currentPage:this.state.currentPage+1})
    }

    render(){
        return(
            <div className="pagination">
                <div className="page_buttons">
                    <input type='button' value="<" disabled={!this.state.currentPage} onClick={this.prevPage}/>
                    <label>{`Pag ${this.state.currentPage+1}`}</label>
                    <input type='button' value=">"  onClick={this.nextPage} disabled={(Math.floor((this.props.videogames.length-1)/15)<=this.state.currentPage)?true:false}/>
                </div>
                <div className="cards">
                    {this.props.videogames.slice(15*this.state.currentPage,(this.state.currentPage*15)+15).map((elem)=>{
                        return (<VideogameCard id={elem.id} nombre={elem.name} imagen={elem.image} generos={elem.genres} />)
                    })}
                </div>
                <div className="page_buttons">
                    <input type='button' value="<" disabled={!this.state.currentPage} onClick={this.prevPage}/>
                    <label>{`Pag ${this.state.currentPage+1}`}</label>
                    <input type='button' value=">"  onClick={this.nextPage} disabled={(Math.floor((this.props.videogames.length-1)/15)<=this.state.currentPage)?true:false}/>
                </div>
            </div>
        )
    }

}