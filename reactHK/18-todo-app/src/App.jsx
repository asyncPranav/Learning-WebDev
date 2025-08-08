import { useState } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Footer from "./components/Footer";

function App() {
  const [todos, setTodos] = useState([]);

  // handle task done
  function handleDone(index) {
    setTodos((prevTodos) => {
      const updated = [...prevTodos];
      updated[index] = {
        ...updated[index],
        done: !updated[index].done,
      };
      return updated;
    });
  }

  // handle task delete
  function handleDelete(index) {
    setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
  }

  return (
    <div>
      <TaskForm setTodos={setTodos} />
      <TaskList
        todos={todos}
        handleDone={handleDone}
        handleDelete={handleDelete}
      />
      <Footer />
    </div>
  );
}

export default App;
