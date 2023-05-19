import React from 'react';
import { useLocation } from 'react-router-dom';
import './RecipeDisplay.css';

function RecipeDisplay() {
  const location = useLocation();
  const { name, instructions, img, time, likes, ingredients, source, calories, fat, protein, carbs } =
    location.state;
  console.log('ing', ingredients);
  console.log('source', source);

  return (
    <div className="recipeDisplay">
      <p>Breadcrumbs Breadcrumbs Breadcrumbs</p>
      <img className="displayImage" src={img} alt={name} />
      <p>RECIPE COURTESY OF {source}</p>
      <h1>{name}</h1>
      <div className="miscGrid">
        <p className="likes">{'♥ ' + likes}</p>
        <p className="time">{time + ' mins.'}</p>
        <div className="third">
          <p>Calories: {calories}</p>
          <p>{fat} fat</p>
          <p>{protein} protein</p>
          <p>{carbs} carbohydrates</p>
        </div>
      </div>
      <div className="instructionsIngredients">
        <div className="ingredients">
          <h2>Ingredients</h2>
          {ingredients?.map((ingredient) => (
            <div className="singleIngredient">
              <img
                className="ingredientImage"
                src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                alt={ingredient.nameClean}
              />

              <p className="ingredient">
                {ingredient.measures.us.amount}
                {ingredient.measures.us.unitShort}
                {ingredient.nameClean}
              </p>
            </div>
          ))}
        </div>
        <div className="instructions">
          <p>{instructions}</p>
        </div>
      </div>
    </div>
  );
}

export default RecipeDisplay;
