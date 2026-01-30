import { useState } from "react";

const Todo = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  // Add todo
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;

    // setTodos([...todos, { text: newTodo.trim(), completed: false }]);
    setTodos((prevTodos) => [
      ...prevTodos,
      { text: newTodo.trim(), completed: false },
    ]);

    setNewTodo(""); // Clear input field after adding
  };

  // Done todo
  const toggleDone = (indexToToggle) => {
    setTodos((prevTodos) => (
      prevTodos.map((todo, index) =>
        index === indexToToggle
          ? { ...todo, completed: !todo.completed }
          : todo,
      )
    ));
  };

  // const toggleDone = (indexToToggle) => {
  //   setTodos((prevTodos) =>
  //     prevTodos.map((todo, i) => {
  //       if (i === indexToToggle) {
  //         return { ...todo, completed: !todo.completed };
  //       }
  //       return todo;
  //     })
  //   );
  // };

  // const toggleDone = (index) => {
  //   const updatedTodos = todos.map((todo, i) => {
  //     if (i === index) {
  //       return { ...todo, completed: !todo.completed };
  //     }
  //     return todo;
  //   });
  //   setTodos(updatedTodos);
  // }


  // Delete todo
  const handleDelete = (indexToDelete) => {
    setTodos((prevTodos) => prevTodos.filter((_, i) => i !== indexToDelete));
  };

  // const handelDelete = (index) => {
  //   const updatedTodos = todos.filter((_, i) => i !== index);
  //   setTodos(updatedTodos);
  // };


  return (
    <div>
      <h1>Todo App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodo}
          placeholder="Add new todo"
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {todos.map((todo, index) => {
          return (
            <li key={index}>
              <div>{todo.text}</div>
              <div>
                <button onClick={() => toggleDone(index)}>Done</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Todo;
