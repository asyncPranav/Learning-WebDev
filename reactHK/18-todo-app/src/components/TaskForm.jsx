import React, { useState } from "react";

const TaskForm = ({setTodos}) => {
  const [todo, setTodo] = useState({
    todoTitle: "",
    todoDescription: "",
    done: false,
  });

  // handleChangeInput
  function handleChange(e) {
    setTodo({
      ...todo, // This copies all the existing fields from the current todo object.
      [e.target.name]: e.target.value,
    });
  }

  // handleAddTodo
  function handleSubmit(e) {
    e.preventDefault();

    // clear input field after submit
    setTodo({
      todoTitle: "",
      todoDescription: "",
    });

    // small validation
    if (!todo.todoTitle || !todo.todoDescription) {
      alert("Fill both input fields");
      return;
    }

    // update todos
    setTodos((prevTodos) => [...prevTodos, todo]);

  }

  return (
    <form onSubmit={handleSubmit} className="formContainer">
      <input
        type="text"
        name="todoTitle"
        value={todo.todoTitle}
        onChange={handleChange}
        placeholder="Add todo title"
        autoComplete="off"
      />
      <input
        type="text"
        name="todoDescription"
        value={todo.todoDescription}
        onChange={handleChange}
        placeholder="Add todo Description"
        autoComplete="off"
      />
      <button type="submit" onClick={handleSubmit}> Add todo </button>
    </form>
  );
};

export default TaskForm;
