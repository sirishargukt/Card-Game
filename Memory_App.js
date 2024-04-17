// cards creation
// cards shuffle
// creating a card grid
// making,comparing,matching,flipping,animation by using css

import React, { useEffect, useState } from 'react';
import SingleCard from './single_card.js';

const initialCards = [
    { src: "/img/angular.png", matched: false },
    { src: "/img/css.jpg", matched: false },
    { src: "/img/html.png", matched: false },
    { src: "/img/node.jpg", matched: false },
    { src: "/img/php.png", matched: false },
    { src: "/img/react.png", matched: false }
];

function App() {
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [firstChoice, setFirstChoice] = useState(null);
    const [secondChoice, setSecondChoice] = useState(null);
    const [disabled,setDisabled] = useState(false);


      // Reset choices after a turn
      const resetChoices = () => {
        setFirstChoice(null);
        setSecondChoice(null);
    }

    // Function to shuffle the cards
    const shuffleCards = () => {
        const shuffledCards = [...initialCards, ...initialCards]
            .sort(() => Math.random() - 0.5)
            .map((card, index) => ({
                ...card,
                id: index 
            }));
        setCards(shuffledCards);
        setTurns(0);
    }

    // Shuffle cards when the component mounts
    useEffect(() => {
        shuffleCards();
    }, []);

    // Function to handle card choice
    const handleChoice = (card) => {
        if (!firstChoice) {
            setFirstChoice(card);
        } else if (!secondChoice) {
            setSecondChoice(card);
        }
    }
   // Check if the two choices means comparison
useEffect(() => {
    if (firstChoice && secondChoice) {
        setDisabled(true)
        if (firstChoice.src === secondChoice.src) {
            setCards(prevCards =>
                prevCards.map(c =>
                    c.src === firstChoice.src ? { ...c, matched: true } : c
                )
            );
            resetChoices();
        }
        else{
            setTimeout(()=>
                resetChoices(),1000);
            }
        setTurns(turns + 1);
        setDisabled(false)
    }
}, [firstChoice, secondChoice]);

    return (
        <div className="div1">
            <h1>Card Game</h1>
            <button onClick={shuffleCards}>Shuffle Cards</button>
            <p>Turns: {turns}</p>

            <div className='card-grid'>
                {cards.map(card => (
                    <SingleCard
                        key={card.id}
                        card={card}
                        handleChoice={handleChoice}
                        flipped={card===firstChoice || card===secondChoice || card.matched}
                        disabled={disabled}
                    />
                ))}
            </div>
        </div> 
    );
}
export default App;
