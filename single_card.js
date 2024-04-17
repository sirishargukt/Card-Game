import React from 'react';

function SingleCard({ card, handleChoice,flipped,disabled }) {
    const handleClick = () => {
        if (!disabled){
            handleChoice(card);
        }
    }
    return (
        <div>
            <div className={`card ${flipped ? "flipped" : ""}`} key={card.id}>
                <div>
                    <img
                        className='front'
                        src={card.src}
                        alt="card front"
                    />
                    <img
                        className='back'
                        src="img/cover.jpg"
                        alt="card back"
                        onClick={handleClick}
                    />
                </div>
            </div>
        </div>
    );
}

export default SingleCard;
