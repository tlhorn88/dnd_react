import React from 'react';
import { useLocation } from 'react-router-dom';
import './RecipeDisplay.css';

function RecipeDisplay() {
  const location = useLocation();
  const { name, img, time, likes, ingredients } = location.state;
  console.log("ing", ingredients);

  return (
    <div>
      <h1>{name}</h1>
      <img src={img} alt={name} />
      <p>{time + ' mins.'}</p>
      <p>{'♥ ' + likes}</p>
      <div className="ingredients">
        {ingredients?.map((ingredient) => (
          <p className="ingredient">{ingredient}</p>
        ))}
      </div>
      {/* ... */}
    </div>
  );
}

export default RecipeDisplay;
