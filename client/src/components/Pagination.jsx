import React,{Component} from "react";
import VideogameCard from "./VideogameCard";


export default class Pagination extends Component{
    constructor(props){
        super(props)
        this.state={videogames:this.props.videogames,currentPage:0}
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
            <div>
                {this.state.videogames.slice(15*this.state.currentPage,(this.state.currentPage*15)+15).map((elem)=>{
                        return (<VideogameCard id={elem.id} nombre={elem.name} imagen={elem.image} generos={elem.genres} />)
                    })}
                    <div>
                    <input type='button' value="<==" disabled={!this.state.currentPage} onClick={this.prevPage}/>
                    <label>{this.state.currentPage+1}</label>
                    <input type='button' value="==>"  onClick={this.nextPage} disabled={(Math.floor((this.state.videogames.length-1)/15)<=this.state.currentPage)?true:false}/>
                    </div>
            </div>
        )
    }

}