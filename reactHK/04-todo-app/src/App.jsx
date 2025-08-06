import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([
    {
      title: "DSA",
      description: "solve atleat 2 question daily",
      done: false,
    },
  ]);

  function addTodo() {
    let newArray = [...todos];
    newArray.push({
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      done: false,
    });
    setTodos(newArray);

    document.getElementById("title").value="";
    document.getElementById("description").value="";
  }

  console.log(todos);
  return (
    <div>
      <input type="text" placeholder="Enter title" id="title" />
      <input type="text" placeholder="Enter description" id="description" />
      <button onClick={addTodo}>Add todo</button>
      {/* {JSON.stringify(todos)} */}
      {
        todos.map((todo) => {
          return(
            <TodoPrint title={todo.title} description={todo.description} done={todo.done} />
          )
        })
      }
    </div>
  );
}

function TodoPrint({ title, description, done }) {
  console.log("hiiii")
  return (
    <div>
      <h4>{title}</h4>
      <p>{description}</p>
      <p>{done ? "Task is done" : "Task is not done"}</p>
      <hr />
    </div>
  );
}

export default App;
