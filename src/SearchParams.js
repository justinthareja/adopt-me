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
    setBreeds([]);
    setBreed("");

    fetchBreeds();

    async function fetchBreeds() {
      try {
        const { breeds } = await pet.breeds(animal);
        const breedStrings = breeds.map(({ name }) => name);
        setBreeds(breedStrings);
      } catch (error) {
        console.error(error);
      }
    }

    // takes a list of dependencies that when updated this useEffect() gets re-run
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
