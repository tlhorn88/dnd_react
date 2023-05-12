import React, { useState } from 'react';
import './FlipCard.css';
import { NavLink } from 'react-router-dom';

function FlipCard(props) {
  console.log('name props', props.name);

  const [isFlipped, setIsFlipped] = useState(false);

  const handleHover = () => {
    setIsFlipped(!isFlipped);
  };

  return (
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

            <div className="ingredientList">
              {props.ingredients?.map((ingredient) => (
                <p className="ingredient">{ingredient}</p>
              ))}
            </div>

            <NavLink
              name="cow"
              state={{
                name: props.name,
                img: props.img,
                time: props.time,
                likes: props.likes,
                ingredients: props.ingredients
              }}
              to={{
                pathname: '/recipeDisplay',
              }}
            >
              <div className="readMore">Full recipe</div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlipCard;
