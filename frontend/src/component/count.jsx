import React from "react";

class Count extends React.Component{
    constructor(){
       super();
       this.incre = this.incre.bind(this)
       this.state = {
        number: 0
       }
    }

    incre(){
        this.setState({
            number: ++this.state.number
        })
    }

    render(){
        return(
            <div>
                <h1>Counter = {this.state.number}</h1>
                <button onClick={this.incre}>Incriment</button>
            </div>
        );
    }
    
}


export default Count;