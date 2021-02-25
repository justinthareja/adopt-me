const Pet = (props) => {
    return React.createElement("div", {}, [
        React.createElement("h1", {}, props.name),
        React.createElement("h2", {}, props.animal),
        React.createElement("h2", {}, props.breed),
    ]);
}

const App = () => {
    return React.createElement(
        "div",
        { id: "something-cool" },
        [
            React.createElement("h1", {}, "Adopt Me!"),
            React.createElement(Pet, { name: "Frida", animal: "Cat", breed: "Tabby" }),
            React.createElement(Pet, { name: "Diego", animal: "Cat", breed: "Mixed" }),
            React.createElement(Pet, { name: "Patches", animal: "Cat", breed: "Orange" }),
        ]
    );
};

ReactDOM.render(
    React.createElement(App),
    document.getElementById("root")
);