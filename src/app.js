import React, { useState } from "react";
import { render } from "react-dom";

function List({ items = [], ...props }) {
  return (
    <ul className="list" {...props}>
      {items.length > 0 &&
        items.map(({ value, completed }, i) => {
          const classNames = `list-item ${
            completed && " list-item--completed"
          }`;

          return (
            <li
              id={i + 1}
              key={value.replace(" ", "") + i}
              className={classNames}
            >
              {value}
            </li>
          );
        })}
    </ul>
  );
}

function removeTodos(todos = [], todoId) {
  const index = todos.findIndex(({ id }) => id === todoId);
  return [...todos.slice(0, todoId), ...todos.slice(todoId + 1)];
}

function updateTodos(todos = [], newTodo = {}) {
  const todoIndex = todos.findIndex((t) => t.id === newTodo.id);
  const todo = todos[todoIndex];
  const todoToBeUpdated = { ...todo, ...newTodo };

  if (!todo) return;

  return [
    ...todos.slice(0, todoIndex),
    todoToBeUpdated,
    ...todos.slice(todoIndex + 1),
  ];
}

function addTodo(todos = [], value = "") {
  const newTodo = {
    id: todos.length + 1,
    completed: false,
    value,
  };

  return [...todos, newTodo];
}

function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  function handleInputKeyUp(e) {
    if (e.key !== "Enter") return;
    setTodos(addTodo(todos, e.target.value));
    setText("");
  }

  function handleListClick(e) {
    const todo = todos.find((t) => t.id == e.target.getAttribute("id"));
    setTodos(updateTodos(todos, { ...todo, completed: !todo.completed }));
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
