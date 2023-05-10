import axios from 'axios';
import { useState } from 'react';
import Card2 from '../Card2/Card2';

function Page2() {
  const [cocktailName, changeCocktailName] = useState('');
  const [displayName, changeDisplayName] = useState();
  const [resultsInfo, changeResultsInfo] = useState();

  const handleInputChange = (e) => {
    changeCocktailName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    changeDisplayName(cocktailName);
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`)
    .then(response => {
      let drinks = response.data.drinks;
      console.log(drinks);
      let drinkInfo = [];
      for (let i = 0; i < drinks.length; i++) {
        drinkInfo.push(
          {
            name: drinks[i].strDrink,
            img: drinks[i].strDrinkThumb,
            glass: drinks[i].strGlass
          }
        ) 

      }
      changeResultsInfo(drinkInfo);
    })
  }

  console.log("resultsinfo", resultsInfo);

  return (
    <div>
      <h1>Cocktail Search</h1>

      <form>
          <label>
          Search a drink type: 
            <input
              type="text"
              name="name"
              value={cocktailName}
              onChange={handleInputChange}
            />
          </label>
          <input type="submit" value="Submit" onClick={handleSubmit} />
        </form>
        <h2>{displayName}</h2>
        
        {resultsInfo && (
          <ul className="cardContainer">
            {resultsInfo.map((drink) => (
              <Card2 
              name={drink.name}
              glass={drink.glass}
              img={drink.img}
              />
            ))}
          </ul>
      )}


    </div>
  )
}

export default Page2;