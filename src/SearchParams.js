import React, { useState, useEffect, useContext } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown";
import Results from "./Results.js";
import ThemeContext from "./ThemeContext";

function SearchParams() {
  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  const [pets, setPets] = useState([]);
  const [theme, setTheme] = useContext(ThemeContext);

  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal,
    });

    setPets(animals || []);
  }

  // initial render happens first then runs this effect
  useEffect(() => {
    // as long as you play by the react rules, you get state propagation for free
    setBreeds([]); // empty array signals to disable the breed dropdown
    setBreed(""); // sets breed select option back to All
    fetchBreeds();

    async function fetchBreeds() {
      try {
        const { breeds: apiBreeds } = await pet.breeds(animal);
        const breedStrings = apiBreeds.map(({ name }) => name);
        setBreeds(breedStrings); // any setter rerenders the component
      } catch (error) {
        console.error(error);
      }
    }

    // takes a list of dependencies that when updated this useEffect() gets re-run
    // empty array [] means doesn't depend on anything, so only run once
    // good for setting up d3 integrations or something of the like
    // undefined means run on every render
  }, [animal, setBreed, setBreeds]);

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            type="text"
            id="location"
            value={location}
            placeholder="location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <label htmlFor="theme">
          Theme
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
            name="theme"
            id="theme"
          >
            <option value="tomato">Tomato</option>
            <option value="peru">Peru</option>
            <option value="darkblue">Dark Blue</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
}

export default SearchParams;
