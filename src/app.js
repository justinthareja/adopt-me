import React, { useState } from "react";
import { render } from "react-dom";

function List({ items = [], ...props }) {
  return (
    <ul className="list" {...props}>
      {items.length > 0 &&
        items.map(({ value, completed, id }, i) => {
          const classNames = `list-item js-list-item ${
            completed && " list-item--completed"
          }`;

          return (
            <li id={id} key={value.replace(" ", "") + i} className={classNames}>
              {value}
              <button className="list-remove js-list-remove">X</button>
            </li>
          );
        })}
    </ul>
  );
}

function addTodo(todos = [], value = "") {
  const newTodo = {
    id: todos.length + 1,
    completed: false,
    value,
  };

  return [...todos, newTodo];
}

function getTodo(todos, id) {
  return todos.find((todo) => todo.id === id);
}

function updateTodos(todos = [], newTodo = {}) {
  const todoIndex = todos.findIndex((t) => t.id === newTodo.id);
  if (!todos[todoIndex]) return;

  const todo = { ...todos[todoIndex], ...newTodo };

  return [...todos.slice(0, todoIndex), todo, ...todos.slice(todoIndex + 1)];
}

function removeTodo(todos = [], todoId) {
  const i = todos.findIndex(({ id }) => id === todoId);

  return [...todos.slice(0, i), ...todos.slice(i + 1)];
}

function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  function handleInputKeyUp(e) {
    if (e.key !== "Enter" || e.target.value === "") return;

    setTodos(addTodo(todos, e.target.value));
    setText("");
  }

  function handleListClick(e) {
    if (e.target.matches(".js-list-remove")) {
      const todoId = Number(e.target.parentElement.getAttribute("id"));
      const result = removeTodo(todos, todoId);

      setTodos(result);
    }

    if (e.target.matches(".js-list-item")) {
      const todo = getTodo(todos, Number(e.target.getAttribute("id")));

      setTodos(updateTodos(todos, { ...todo, completed: !todo.completed }));
    }
  }

  return (
    <div className="app">
      <label htmlFor="todo">
        <span>Add A New Todo:</span>
        <input
          type="text"
          name="todo"
          id="todo"
          value={text}
          placeholder="Pick up groceries..."
          onChange={(e) => setText(e.target.value)}
          onBlur={(e) => setText(e.target.value)}
          onKeyUp={handleInputKeyUp}
        />
      </label>
      <List items={todos} onClick={handleListClick} />
    </div>
  );
}

render(<App />, document.getElementById("root"));
