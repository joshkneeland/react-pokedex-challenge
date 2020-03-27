import React, { useState, useEffect } from "react";
import { TextField, Select } from "@material-ui/core";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import "../styles/App.scss";
import "../styles/PokeList.scss";

function PokeList() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [type, setType] = useState("");
  const [weakness, setWeakness] = useState("");
  const [pokeListItems, setPokeListItems] = useState([]);
  const [pokeListCopy, setPokeListCopy] = useState([]);

  // Fetch PokeList from URL, and set state
  useEffect(() => {
    getPokeList();
  }, []);

  const getPokeList = async () => {
    try {
      const data = await fetch(
        "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
      );
      const pokeListItems = await data.json();
      setPokeListItems(pokeListItems.pokemon);
      setPokeListCopy(pokeListItems.pokemon);
      return pokeListItems;
    } catch (e) {
      console.log("Error is: ", e);
      return e;
    }
  };

  // Filter PokeList based on user input
  const handleChange = (e, ref) => {
    const inputVal = e.target.value;

    let pokeResults = inputVal
      ? pokeListItems.filter(pokemon => {
          return (pokemon[ref].toLowerCase
            ? pokemon[ref].toLowerCase()
            : pokemon[ref]
          ).includes(
            pokemon[ref].toLowerCase ? inputVal.toLowerCase() : inputVal
          );
        })
      : pokeListItems;

    if (ref !== "weaknesses" && weakness) {
      pokeResults = pokeResults.filter(pokemon => {
        return pokemon["weaknesses"].includes(weakness);
      });
    }

    if (ref !== "type" && type) {
      pokeResults = pokeResults.filter(pokemon => {
        return pokemon["type"].includes(type);
      });
    }

    if (ref !== "name" && searchTerm) {
      pokeResults = pokeResults.filter(pokemon => {
        return pokemon["name"]
          .toLowerCase()
          .includes(searchTerm.toLocaleLowerCase());
      });
    }

    if (ref === "weaknesses") {
      setWeakness(inputVal);
    } else if (ref === "type") {
      setType(inputVal);
    } else if (ref === "name") {
      setSearchTerm(inputVal);
    }
    setPokeListCopy(pokeResults);
  };

  // Loop over options for select dropdowns, Initialize w/an empty value
  const optionsArr = [
    "",
    "Bug",
    "Electric",
    "Fire",
    "Flying",
    "Ghost",
    "Grass",
    "Ground",
    "Normal",
    "Poison",
    "Psychic",
    "Rock",
    "Water"
  ];

  return (
    <div className="PokeList">
      <h1>Gotta catch'em all! Use the inputs below to filter the Pokédex</h1>
      <div className="search-wrapper">
        <TextField
          id="standard-basic"
          label="Ex: Snorlax"
          value={searchTerm}
          onChange={e => handleChange(e, "name")}
        />
        <FormControl className="SelectDropdown">
          <Select
            native
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            onChange={e => handleChange(e, "type")}
          >
            {optionsArr.map((val, i) => {
              return (
                <option value={val} key={i}>
                  {val}
                </option>
              );
            })}
          </Select>
          <FormHelperText>Type</FormHelperText>
        </FormControl>
        <FormControl className="SelectDropdown">
          <Select
            native
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={weakness}
            onChange={e => handleChange(e, "weaknesses")}
          >
            {optionsArr.map((val, i) => {
              return (
                <option value={val} key={i}>
                  {val}
                </option>
              );
            })}
          </Select>
          <FormHelperText>Weakness</FormHelperText>
        </FormControl>
      </div>
      <ul>
        {pokeListCopy.map(pokemon => {
          return (
            <li key={pokemon.id}>
              <div>
                <span>Name: </span>
                {pokemon.name}
              </div>
              <div>
                <span>Num: </span>
                {pokemon.num}
              </div>
              <div>
                <span>Type: </span>
                {pokemon.type.map((type, index) => {
                  return pokemon.type.length === index + 1 ? type : type + ", ";
                })}
              </div>
              <div>
                <span>Weakness: </span>
                {pokemon.weaknesses.map((weakness, index) => {
                  return pokemon.weaknesses.length === index + 1
                    ? weakness
                    : weakness + ", ";
                })}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default PokeList;
