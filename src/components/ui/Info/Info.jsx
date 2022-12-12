import React, {useState, Component, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Info.css";




export default function Info (){
   const dispatch = useDispatch();
   const output = useSelector (state => state.output);
   const visible = useSelector(state => state.visible)
   const makeUnVisible = () => {
    dispatch({type: "makeUnVisible"})
   }
   function updateOutput (text)  {
    dispatch({type: "updateOutput", output: text})
   }
    
        return(
        <div className={'info-area ' + (visible? 'visible-i' : 'hidden-i')} >
                       <span className="information">{output}</span>                       
                       <span className="closeBtn">
                       <span class="material-icons" onClick={() => makeUnVisible()}>close</span>
                       </span>
        </div>
        )
    
 

}
export function UpdateOutput (text)  {
    const dispatch = useDispatch();
    dispatch({type: "updateOutput", output: text})
   }


     
  



