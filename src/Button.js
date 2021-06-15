import React from "react"
import "./Button.css"
const Button = ({handleCard,isRun})=>{
    return(
        <div className="btnStyle">
            <button onClick={handleCard}>{!isRun ? "GIMME A CARD" : "STOP"}</button>
        </div>
    )
}

export default Button