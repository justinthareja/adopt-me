import React, { useState } from "react";

function useDropdown(label, defaultState, options) {
  const [state, setState] = useState(defaultState);
  const id = `use-dropdown-${label.replace(" ", "").toLowerCase()}`;

  function Dropdown() {
    return (
      <label htmlFor={id}>
        {label}
        <select
          name=""
          id={id}
          value={state}
          onChange={(e) => setState(e.target.value)}
          onBlur={(e) => setState(e.target.value)}
          disabled={options.length === 0} // allows ux to let user know data is being fetched
        >
          <option>All</option>
          {options.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
    );
  }

  return [state, Dropdown, setState];
}

export default useDropdown;
