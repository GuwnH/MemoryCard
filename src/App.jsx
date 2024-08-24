import { useState, useEffect } from 'react';
import './App.css';
import Card from './comps/Card';

function App() {
  const [score, setScore] = useState(0);
  const [pokeList, setPokeList] = useState([]);
  const [cards, setCards] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [win, setWin] = useState(false);
  const pokemon = [
    'garchomp', 
    'pupitar', 
    'pikachu', 
    'geodude', 
    'charizard', 
    'rayquaza', 
    'milotic',
    'slaking',
    'dialga', 
    'diggersby',
    'scizor',
    'jolteon'
  ];

  const url = "https://pokeapi.co/api/v2/pokemon/";

  useEffect(() => {
    const fetchData = async () => {
      const tempList = [];
      for (const element of pokemon) {
        const response = await fetch(url + element);
        const data = await response.json();
        tempList.push({ name: data.name, id: data.id, img: data.sprites.front_default });
      }
      setPokeList(tempList);
      const tempCards = tempList.map(poke => (
        <Card key={poke.id} name={poke.name} img={poke.img} id={poke.id} handleClick={handleClick} />
      ));
      setCards(tempCards);
      shuffle(tempCards);
    };
    fetchData();
  }, []);

  const shuffle = (list) => {
    const newList = [...list];
    for (let i = newList.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [newList[i], newList[j]] = [newList[j], newList[i]];
    }
    return newList;
  };

  const handleClick = (id) => {
    // Use a function inside setClicked to ensure we are working with the latest state
    setClicked(prevClicked => {
      if (prevClicked.includes(id)) {
        // Reset score and clicked list if a duplicate is found
        setScore(0);
        // Reset clicked list
        return []; 
      } else {
        const newClicked = [...prevClicked, id];
        // Update the score and shuffle the cards only if no duplicate is found
        setScore(prevScore => prevScore + 1);
        setCards(prevCards => shuffle(prevCards));

        if (newClicked.length === pokemon.length) {
          setWin(true);
        }

        return newClicked;
      }
    });
  };

  if (win) {
    return (
      <div className='everything'>
        <h1>You Win</h1>
      </div>
    );
  } else {
    return (
      <div className='everything'>
        <h1 className='rule'>Don't Click The Same Card Twice</h1>
        <h2 className='score'>Score: {score}</h2>
        <div className='board'>
          {cards}
        </div>
      </div>
    );
  }
}

export default App;
