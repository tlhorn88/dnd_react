import React, { useState } from 'react';
import './FlipCard.css';
import { NavLink } from 'react-router-dom';

function FlipCard(props) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleHover = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <NavLink
      state={{
        name: props.name,
        img: props.img,
        time: props.time,
        likes: props.likes,
        instructions: props.instructions,
        source: props.source,
        ingredients: props.ingredients,
        calories: props.calories,
        carbs: props.carbs,
        fat: props.fat,
        protein: props.protein
      }}
      to={{
        pathname: '/recipeDisplay',
      }}
    >
    <div
      className={`cardTotal ${isFlipped ? 'flipped' : ''}`}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <div className="front">
        <div className="imageContainer">
          <img className="cardImage" src={props.img} alt={props.name} />
          <h1 className="title">{props.name}</h1>
        </div>
      </div>

      <div className="back">
        <div className="mainArea">
          <div className="description">
            <p>{props.time + ' mins.'}</p>
            <p>{'♥ ' + props.likes}</p>
            <p>{'Calories per serving: ' + props.calories}</p>
            <p>{'Carbs: ' + props.carbs}</p>

            <p>{'Fat: ' + props.fat}</p>
            <p>{'Protein: ' + props.protein}</p>

              <div className="readMore">Full recipe</div>
          </div>
        </div>
      </div>
    </div>
            </NavLink>
  );
}

export default FlipCard;
