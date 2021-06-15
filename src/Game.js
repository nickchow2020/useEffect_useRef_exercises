import React,{useState,useEffect,useRef} from "react"
import Button from "./Button"
import GameBoard from "./GameBoard"
import axios from "axios"

import "./Game.css"
const Game = ()=>{

    const [cards,setCards] = useState([])
    const [deck,setDeck] = useState({})
    const [isFinish,setIsFinish] = useState(false)
    const [isRun,setIsRun] = useState(false)

    const intervalId = useRef() 

    useEffect(()=>{
        async function getDeck(){
            const deck = await axios.get("https://deckofcardsapi.com/api/deck/new/")
            const shuffleDeck = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.data.deck_id}/shuffle/`)
            setDeck(shuffleDeck.data)
        }
        getDeck()
    },[])

    useEffect(()=>{
        if(cards.length >= 52){
            setIsFinish(true)
            clearInterval(intervalId.current)
        }
    },[cards])

    useEffect(()=>{
        async function getCard(){
            const card = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`)
            setCards(cards => ([...cards,card.data.cards[0]]))
        }

        if(isRun){
            intervalId.current = setInterval(()=>{
                getCard()
            },1000)
        }

        return ()=>{
            clearInterval(intervalId.current)
        }
    },[isRun,deck.deck_id])


    const handleCard = ()=>{
        setIsRun(!isRun)
    }


    return(
        <div className="gameBoard">
            {isFinish && alert("Error: no cards remaining!")}
            {!isFinish && <Button handleCard={handleCard} isRun={isRun}/>}
            <GameBoard cards={cards} />
        </div>
    )
}

export default Game