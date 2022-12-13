
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Info.css";



export const Info = () => {
   const dispatch = useDispatch();
   const output = useSelector (state => state.output);
   const visible = useSelector(state => state.visible);
   
   const makeUnVisible = () => {
    dispatch(makeUnVisible())
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
