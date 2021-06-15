import React,{useEffect,useState} from "react"
import Card from "./Card"
import { v4 as uuid } from "uuid"

const GameBoard = ({cards})=>{  

    return (
        <div className="board">
        {
            cards.map(card => <Card key={uuid()} image={card.image} code={card.code}/>)
        }
        </div>
    )
}


export default GameBoard

