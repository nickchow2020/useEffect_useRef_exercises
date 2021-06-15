import React from "react"

const Card = ({image,code})=>{
    return (
        <img src={image} alt={code} />
    )
}

export default Card