import logo from './logo.svg';
import './App.css';
import Card from './card';
import { useState, useEffect } from 'react';

function App() {
  const [pokemondata, setPokemonData] = useState(null);
  const [dataArray, setDataArray] = useState([]);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          pokemonNames.map(name =>
            fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then(response => response.json())
          )
        );
        setDataArray(responses);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header>
        <div className='leftsection'>
       <h1>Pokemon Memory Game</h1>
       <p>Get points by clicking on an image but don't click on any more than once!</p>

       </div>
       <div  className='rightsection'>
        <p>Score:</p>
       <p>Best Score:</p>
       </div>
      </header>
      {dataArray && dataArray.map((data) => (
        <Card data={data} />
      ))}
    </div>
  );
}

export default App;
