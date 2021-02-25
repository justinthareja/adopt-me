import React from "react";
import { render } from "react-dom";
import Pet from "./Pet";

function App() {
  return (
    <div>
      <h1 id="something-cool">Adopt Me!</h1>
      <Pet name="Frida" animal="Cat" breed="Tabby" />
      <Pet name="Diego" animal="Cat" breed="Mixed" />
      <Pet name="Patches" animal="Cat" breed="Orange" />
    </div>
  );
}

render(<App />, document.getElementById("root"));
