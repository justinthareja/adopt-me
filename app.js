const Pet = () => {
    return React.createElement("div", {}, [
        React.createElement("h1", {}, "Frida"),
        React.createElement("h2", {}, "Cat"),
        React.createElement("h2", {}, "Tabby"),
    ]);
}

const App = () => {
    return React.createElement(
        "div",
        { id: "something-cool" }, 
        [
            React.createElement("h1", {}, "Adopt Me!"),
            React.createElement(Pet),
            React.createElement(Pet),
            React.createElement(Pet),
        ]
    );
};

ReactDOM.render(
    React.createElement(App),
    document.getElementById("root")
);