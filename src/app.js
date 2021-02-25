import React from "react";
import { render } from "react-dom";
import Pet from "./Pet";

const App = () => {
  return React.createElement("div", { id: "something-cool" }, [
    React.createElement("h1", {}, "Adopt Me!"),
    React.createElement(Pet, { name: "Frida", animal: "Cat", breed: "Tabby" }),
    React.createElement(Pet, { name: "Diego", animal: "Cat", breed: "Mixed" }),
    React.createElement(Pet, {
      name: "Patches",
      animal: "Cat",
      breed: "Orange",
    }),
  ]);
};

render(React.createElement(App), document.getElementById("root"));
