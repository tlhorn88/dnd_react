import React, { useEffect, useState } from 'react';
import FlipCard from '../FlipCard/FlipCard';
import axios from 'axios';

function RandomRecipe() {
  const [resultsInfo, changeResultsInfo] = useState([]);

  useEffect(() => {
    const apiKey = '759ce36523be4f7ab7f8ff69727425af';
    axios
      .get(
        `https://api.spoonacular.com/recipes/random?apiKey=759ce36523be4f7ab7f8ff69727425af&number=4&instructionsRequired=true`
      )
      .then((response) => {
        const recipes = response.data.recipes;
        const recipeInfo = recipes.map((recipe) => ({ key: recipe.id }));
        changeResultsInfo(recipeInfo);

        const promises = recipeInfo.map(async (item) => {
          const itemResponse = axios.get(
            `https://api.spoonacular.com/recipes/${item.key}/information?apiKey=${apiKey}`
          );
          const nutritionalResponse = axios.get(
            `https://api.spoonacular.com/recipes/${item.key}/nutritionWidget.json?apiKey=${apiKey}`
          );
          return Promise.all([itemResponse, nutritionalResponse]);
        });

        return Promise.all(promises);
      })
      .then((response) => {
        const recipeInfo2 = response.map(([itemResponse, nutritionalResponse]) => {
          const recipeData = itemResponse.data;
          const nutritionalData = nutritionalResponse.data;

          return {
            name: recipeData.title,
            img: recipeData.image,
            key: recipeData.id,
            time: recipeData.readyInMinutes,
            source: recipeData.creditsText,
            sourceUrl: recipeData.sourceUrl,
            likes: recipeData.aggregateLikes,
            description: recipeData.summary,
            ingredientList: recipeData.extendedIngredients,
            instructions: recipeData.analyzedInstructions,
            calories: nutritionalData.calories,
            fat: nutritionalData.fat,
            protein: nutritionalData.protein,
            carbs: nutritionalData.carbs,
          };
        });

        changeResultsInfo(recipeInfo2);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  console.log("resultsInformation", resultsInfo);

  return (
    <div>
      <ul className="cardContainer">
        {resultsInfo.length > 0 ? (
          resultsInfo.map((recipe) => (
            <FlipCard
              key={recipe.key}
              name={recipe.name}
              img={recipe.img}
              likes={recipe.likes}
              time={recipe.time}
              description={recipe.description}
              ingredients={recipe.ingredientList}
              instructions={recipe.instructions}
              source={recipe.source}
              calories={recipe.calories}
              carbs={recipe.carbs}
              fat={recipe.fat}
              protein={recipe.protein}
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </ul>
    </div>
  );
}

export default RandomRecipe;