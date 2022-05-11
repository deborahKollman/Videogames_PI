import React,{Component,Link} from "react";

// export default function LandingPage(){
//     return(
//         <div>

//         </div>
//     )
// }

export default class LandingPage extends Component{
    render(){
        return (
            <div>
                <h1>Welcome!!!</h1>
                <p>Ready, set</p>
                <button><Link to='/videogames'>Play</Link></button>
            </div>
        )
    }
}