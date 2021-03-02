import React from "react";
import { render } from "react-dom";
import { Router } from "@reach/router";
import SearchParams from "./SearchParams";
import Details from "./Details";

function App() {
  return (
    <React.StrictMode>
      <div>
        <h1 id="something-cool">Adopt Me!</h1>
        <Router>
          <SearchParams path="/" />
          <Details path="/details/:id" />
        </Router>
      </div>
    </React.StrictMode>
  );
}

render(<App />, document.getElementById("root"));
