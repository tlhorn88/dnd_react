import axios from 'axios';
import { useState } from 'react';
import FlipCard from '../FlipCard/FlipCard';

function Page3() {
  const [displayName, changeDisplayName] = useState();
  const [queryText, changeQueryText] = useState();
  const [resultsInfo, changeResultsInfo] = useState();
  
  let dummyData = [
    {
      key: 639794,
      name: 'Coconut milk risotto (Arborio rice pudding)',
      img: 'https://spoonacular.com/recipeImages/639794-312x231.jpg',
      time: 10,
      likes: 86,
      ingredientList: ["bacon", "love", "butter", "rainbow sprinkles"]
    },
    {
      key: 656297,
      name: 'Pistachio Milk Chocolate Chip Cookies',
      img: 'https://spoonacular.com/recipeImages/656297-312x231.jpg',
      time: 97,
      likes: 107,
      ingredientList: ["bacon", "love", "butter", "rainbow sprinkles"]
    },
    {
      key: 658778,
      name: 'Rose Petal, Milk and Honey Agar Agar',
      img: 'https://spoonacular.com/recipeImages/658778-312x231.jpg',
      time: 101,
      likes: 860,
      ingredientList: ["bacon", "love", "butter", "rainbow sprinkles"]
    },
    {
      key: 794350,
      name: 'Cherry Coconut Milk Smoothie',
      img: 'https://spoonacular.com/recipeImages/794350-312x231.jpg',
      time: 15,
      likes: 6,
      ingredientList: ["bacon", "love", "butter", "rainbow sprinkles"]
    },
  ];

  let apiKey = '759ce36523be4f7ab7f8ff69727425af';

  const handleInputChange = (e) => {
    changeQueryText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    changeDisplayName(queryText);
    axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${queryText}&number=4`)
    .then(response => {
      let recipes = response.data.results;
      console.log(recipes);
      let recipeInfo = [];

      for (let i = 0; i < recipes.length; i++) {
        recipeInfo.push(
          {
            key: recipes[i].id
          }
        )
      }

      changeResultsInfo(recipeInfo);

      const promises = recipeInfo.map(async (item) => {
        const itemResponse = await axios.get(`https://api.spoonacular.com/recipes/${item.key}/information?apiKey=${apiKey}`);
        return itemResponse;
      })
      return Promise.all(promises);
    })
    .then(response => {
      let recipeInfo2 = [];
      let ingredientList = [];
      ingredientList.push(response[0].data.extendedIngredients[0].nameClean);



      console.log("ingredient list!!", ingredientList[0]);


      // console.log("response2", response);
      for (let i = 0; i < response.length; i++) {
        let ingredientList = response[i].data.extendedIngredients;
        let ingredientListNamesOnly = []

        for (let j = 0; j < ingredientList.length; j++) {
          ingredientListNamesOnly.push(
            ingredientList[j].nameClean
          )
        }

        console.log("clean Ingredient List", ingredientListNamesOnly);

        recipeInfo2.push(
          {
            name: response[i].data.title,
            img: response[i].data.image,
            key: response[i].data.id,
            instructions: response[i].data.instructions,
            time: response[i].data.readyInMinutes,
            likes: response[i].data.aggregateLikes,
            description: response[i].data.summary,
            ingredientList: ingredientListNamesOnly
          }
        )
      }
      console.log("recipeInfo2", recipeInfo2);
      changeResultsInfo(recipeInfo2);

      let recipe = response[0].data;
      console.log("response", response);
      console.log("new recipes", recipe);
    })
  }

  console.log(resultsInfo);

  return (
    <div>
      <h1>Recipe Search</h1>

      <form>
          <label>
            <input
              type="text"
              name="name"
              value={queryText}
              onChange={handleInputChange}
            />
          </label>
          <input type="submit" value="Submit" onClick={handleSubmit} />
      </form>
      <h2>{displayName}</h2>

{/* 
      {resultsInfo && (
        <ul className='cardContainer'>
          {resultsInfo.map((recipe) => (
            <FlipCard
              name={recipe.name}
              img={recipe.img}
              likes={recipe.likes}
              time={recipe.time}
              description={recipe.description}
              ingredients={recipe.ingredientList}
            />
          ))}
        </ul>
      )}    
*/}


      {dummyData && (
        <ul className='cardContainer'>
          {dummyData.map((recipe) => (
            <FlipCard
              name={recipe.name}
              img={recipe.img}
              likes={recipe.likes}
              time={recipe.time}
              description={recipe.description}
              ingredients={recipe.ingredientList}
            />
          ))}
        </ul>
      )}

      
    </div>
  );
}

export default Page3;
