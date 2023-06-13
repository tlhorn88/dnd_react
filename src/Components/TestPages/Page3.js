import axios from 'axios';
import { useEffect, useState } from 'react';
import FlipCard from '../FlipCard/FlipCard';
import { useLocation } from 'react-router-dom';
import pasta from '../../localJSON/pasta.json';

function Page3() {
  const location = useLocation();
  const searchName = new URLSearchParams(location.search).get('searchName');
  const [resultsInfo, changeResultsInfo] = useState([]);
  const [noResults, changeNoResults] = useState(false);

  useEffect(() => {
    if (searchName) {
      const apiKey = '759ce36523be4f7ab7f8ff69727425af';
      changeResultsInfo([]);

      axios
        .get(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchName}&number=2&instructionsRequired=true`
        )
        .then((response) => {
          console.log('response!', response);
          let recipes = response.data.results;
          if (recipes.length === 0) {
            // No results found
            changeNoResults(true);
          } else {
            let recipeInfo = recipes.map((recipe) => ({
              key: recipe.id,
            }));
            console.log('recipeInfo', recipeInfo);
            changeResultsInfo(recipeInfo);

            const promises = recipeInfo.map(async (item) => {
              const itemResponse = await axios.get(
                `https://api.spoonacular.com/recipes/${item.key}/information?apiKey=${apiKey}`
              );

              const nutritionalResponse = await axios.get(
                `https://api.spoonacular.com/recipes/${item.key}/nutritionWidget.json?apiKey=${apiKey}`
              );

              return [itemResponse, nutritionalResponse];
            });

            return Promise.all(promises);
          }
        })
        .then((response) => {
          if (response) {
            let recipeInfo2 = [];
            let ingredientList = [];
            console.log('new response', response);
            ingredientList.push(
              response[0][0].data.extendedIngredients[0].nameClean
            );

            for (let i = 0; i < response.length; i++) {
              recipeInfo2.push({
                name: response[i][0].data.title,
                img: response[i][0].data.image,
                key: response[i][0].data.id,
                time: response[i][0].data.readyInMinutes,
                source: response[i][0].data.creditsText,
                sourceUrl: response[i][0].data.sourceUrl,
                likes: response[i][0].data.aggregateLikes,
                description: response[i][0].data.summary,
                ingredientList: response[i][0].data.extendedIngredients,
                instructions: response[i][0].data.analyzedInstructions,
                calories: response[i][1].data.calories,
                fat: response[i][1].data.fat,
                protein: response[i][1].data.protein,
                carbs: response[i][1].data.carbs,
              });
            }

            changeResultsInfo(recipeInfo2);
            changeNoResults(false); // Reset noResults state
          }
        })
        .catch((error) => {
          console.log(error);
          // Handle error if needed
        });
    }
  }, [searchName]);

  return (
    <div>
      {noResults && (
        <h2>
          We're sorry. We couldn't find anything matching "{searchName}." Please
          double-check your spelling or try searching for "chocolate" instead.
        </h2>
      )}

      {resultsInfo.length > 0 && (
        <div>
          <h2>Results for {searchName}</h2>
        <ul className="cardContainer">
          {resultsInfo.map((recipe) => (
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
          ))}
        </ul>
        </div>
      )}

        {/* <ul className="cardContainer">
          {pasta.map((recipe) => (
            <FlipCard
              key={recipe[0].id}
              name={recipe[0].title}
              img={recipe[0].image}
              likes={recipe[0].aggregateLikes}
              time={recipe[0].readyInMinutes}
              description={recipe[0].summary}
              ingredients={recipe[0].extendedIngredients}
              instructions={recipe[0].analyzedInstructions}
              source={recipe[0].sourceName}
              calories={recipe[1].calories}
              carbs={recipe[1].carbs}
              fat={recipe[1].fat}
              protein={recipe[1].protein}
            />
          ))}
        </ul> */}
      {/* ) */}
    </div>
  );
}

export default Page3;
