import { useState } from "react";
import "./App.css";

const Todo = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo) {
      setTodos((prevTodos) => [
        ...prevTodos,
        { text: newTodo, completed: false },
      ]);
      setNewTodo("");
    }
  };

  const toggleDone = (indexToToggle) =>
    setTodos((prevTodos) =>
      prevTodos.map((todo, index) =>
        index === indexToToggle
          ? { ...todo, completed: !todo.completed }
          : todo,
      ),
    );

  const handleDelete = (indexToDelete) =>
    setTodos((prevTodos) =>
      prevTodos.filter((_, index) => index !== indexToDelete),
    );

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <h2>Todo App ⚡</h2>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter todo"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <div key={index} className="todoItem">
            <li className={todo.completed && "done"}>{todo.text}</li>
            <div className="btnContainer">
              <button onClick={() => toggleDone(index)} className="doneBtn"><i className="fa-regular fa-circle-check"></i></button>
              <button onClick={() => handleDelete(index)} className="deleteBtn"><i className="fa-regular fa-circle-xmark"></i></button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
