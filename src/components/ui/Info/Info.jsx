import React, {useState, Component, useCallback } from "react";

import "./Info.css";




export default class Info extends Component{
    state = {
        output: ("ad"),
        isVisible: true
    };
    changeVisible = () => {
        
        const{isVisible} = this.state;
        this.setState({isVisible: !isVisible})
    }
    updateText = (text) => {
        const {output} = this.state;
        this.setState({output: (text.current.value)})
    }
    render(){
        return(
        <div className={'info-area ' + (this.state.isVisible? 'visible-i' : 'hidden-i')} >
                       <span className="information">{this.state.output}</span>                       
                       <span className="closeBtn">
                       <span class="material-icons" onClick={() => this.changeVisible()}>close</span>
                       </span>
        </div>
        )
    }
 

}


     
  



