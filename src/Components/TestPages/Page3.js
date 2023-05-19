import axios from 'axios';
import { useEffect, useState } from 'react';
import FlipCard from '../FlipCard/FlipCard';
import { useLocation } from 'react-router-dom';
import pasta from '../../localJSON/pasta.json';

function Page3() {
  console.log(pasta);
  const location = useLocation();
  const searchName = new URLSearchParams(location.search).get('searchName');
  const [resultsInfo, changeResultsInfo] = useState();

  useEffect(() => {
    if (searchName) {
      console.log('useeffect is live');
      const apiKey = '759ce36523be4f7ab7f8ff69727425af';
      axios
        .get(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchName}&number=4&instructionsRequired=true`
        )
        .then((response) => {
          console.log('response!', response);
          let recipes = response.data.results;
          let recipeInfo = [];

          for (let i = 0; i < recipes.length; i++) {
            recipeInfo.push({
              key: recipes[i].id,
            });
          }
          console.log("recipeInfo", recipeInfo);
          changeResultsInfo(recipeInfo);

          const promises = recipeInfo.map(async (item) => {
            const itemResponse = await axios.get(
              `https://api.spoonacular.com/recipes/${item.key}/information?apiKey=${apiKey}`
            );

            const nutritionalResponse = await axios.get(
              `https://api.spoonacular.com/recipes/${item.key}/nutritionWidget.json?apiKey=${apiKey}`
            )
            return [itemResponse, nutritionalResponse];
            // return itemResponse;
          });
          return Promise.all(promises);
        })
        .then((response) => {
          let recipeInfo2 = [];
          let ingredientList = [];
          console.log("new response", response);
          ingredientList.push(
            response[0][0].data.extendedIngredients[0].nameClean
          );

          for (let i = 0; i < response.length; i++) {
            // let ingredientList = response[i][0].data.extendedIngredients;
            // let ingredientListNamesOnly = [];

            // for (let j = 0; j < ingredientList.length; j++) {
            //   ingredientListNamesOnly.push(ingredientList[j].nameClean);
            // }
            console.log("test", [i]);
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
              instructions: response[i][0].data.instructions,
              carlories: response[i][1].data.carlories
            });
          }

          changeResultsInfo(recipeInfo2);
        });
    }
  }, [searchName]);

  return (
    <div>
      <h1>{searchName}</h1>

      {resultsInfo && (
        <ul className="cardContainer">
          {resultsInfo.map((recipe) => (
            <FlipCard
              name={recipe.name}
              img={recipe.img}
              likes={recipe.likes}
              time={recipe.time}
              description={recipe.description}
              ingredients={recipe.ingredientList}
              instructions={recipe.instructions}
              source={recipe.source}
            />
          ))}
        </ul>
      )}

      {pasta && (
        <ul className="cardContainer">
          {pasta.map((recipe) => (
            <FlipCard
              name={recipe[0].title}
              img={recipe[0].image}
              likes={recipe[0].aggregateLikes}
              time={recipe[0].readyInMinutes}
              description={recipe[0].summary}
              ingredients={recipe[0].extendedIngredients}
              instructions={recipe[0].instructions}
              source={recipe[0].sourceName}
              calories={recipe[1].calories}
              carbs={recipe[1].carbs}
              fat={recipe[1].fat}
              protein={recipe[1].protein}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default Page3;
