import logo from './logo.svg';
import './App.css';
import Card from './card';
import { useState, useEffect } from 'react';

function App() {
  const pokemonNames = [
    "pikachu",
    "charmander",
    "bulbasaur",
    "squirtle",
    "jigglypuff",
    "eevee",
    "snorlax",
    "mewtwo",
    "psyduck",
    "meowth",
    "charizard",
    "gyarados"
  ];

  function shuffleArray(array) {
    const newArray = [...array]; // Create a copy of the original array to avoid mutation
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Swap elements
    }
    return newArray;
  }

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0); // Initialize bestScore state
  const [clickedIds, setClickedIds] = useState([]); // State variable to store the clicked ids
  const [pokemonData, setPokemonData] = useState([]);
  const [shuffledNames, setShuffledNames] = useState(pokemonNames);

  const handleShuffle = (id) => {
    if (clickedIds.includes(id)) {
      // If the clicked ID is already in the clickedIds array, reset the score and update the best score
      if (score > bestScore) {
        setBestScore(score);
      }
      setScore(0);
      setClickedIds([]); // Reset the clickedIds array
    } else {
      // If the clicked ID is not in the clickedIds array, increment the score and add the ID to clickedIds
      setScore((prevScore) => prevScore + 1);
      setClickedIds((prevIds) => [...prevIds, id]);
      
    }

    const newpokemonnames = shuffleArray(pokemonNames);
    setShuffledNames(newpokemonnames);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          shuffledNames.map(async (name) => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            return response.json();
          })
        );
        setPokemonData(responses);
      } catch (error) {
        console.error("Could not fetch the data:", error);
      }
    };
    fetchData();
  }, [shuffledNames]);

  return (
    <div className="App">
      <header>
        <div className='leftsection'>
          <h1>Pokemon Memory Game</h1>
          <p>Get points by clicking on an image but don't click on any more than once!</p>
        </div>
        <div className='rightsection'>
          <p>Score: {score}</p>
          <p>Best Score: {bestScore}</p>
        </div>
      </header>
      <div className="card-container">
        {pokemonData.map((data) => (
          <Card key={data.id} data={data} handleShuffle={() => handleShuffle(data.id)} />
        ))}
      </div>
    </div>
  );   
}

export default App;
