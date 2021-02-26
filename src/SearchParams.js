import React, { useState, useEffect } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown";

function SearchParams() {
  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);

  // initial render happens first then runs this effect
  useEffect(() => {
    // as long as you play by the react rules, you get state propagation for free
    setBreeds([]); // empty array signals to disable the breed dropdown
    setBreed(""); // sets breed select option back to All
    fetchBreeds();

    async function fetchBreeds() {
      try {
        const { breeds: apiBrees } = await pet.breeds(animal);
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
      <form action="">
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
        <button>Submit</button>
      </form>
    </div>
  );
}

export default SearchParams;
