import axios from 'axios';
import { useEffect, useState } from 'react';

function Page1() {
  const [randomMonster, changeRandomMonster] = useState();
  const [randomMonsterInfo, changeRancomMonsterInfo] = useState();

  function handleClick(event) {
    event.preventDefault();

    axios.get('https://www.dnd5eapi.co/api/monsters/')
      .then(response => {
        let monsterList = response.data.results;
        let randomNumber = Math.floor(Math.random() * monsterList.length);
        console.log('monster list', monsterList);
        let randomMonsterInfo = {
          name: monsterList[randomNumber].name,
          url: `https://www.dnd5eapi.co${monsterList[randomNumber].url}`,
        }
        changeRandomMonster(randomMonsterInfo.name);
        return axios.get(randomMonsterInfo.url);
      })
      .then(response => {
        console.log(response);
        let info = {
          
        };
        changeRancomMonsterInfo(info);
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <div>
      <h1>{randomMonster}</h1>

        <img src={require('../../img/puppies1.avif')} />
      <button
        onClick={handleClick}
      >
        gimme a monster!
      </button>

    </div>
  )
}

export default Page1;