import react from "react";
import { useReducer } from "react";
import { useForm } from "react-hook-form";
import "./App.css";

// initial state to hold todos
const initialState = { todos: [] };

// reducer manage state based on action
function reducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: Date.now(), text: action.payload, completed: false },
        ],
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((item) =>
          item.id === action.payload
            ? { ...item, completed: !item.completed }
            : item
        ),
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((item) => item.id !== action.payload),
      };

    default:
      return state;
  }
}
function App() {
  // hook up reducer
  const [state, dispatch] = useReducer(reducer, initialState);

  // total todos and completed tods
  const total = state.todos.length;
  const completed = state.todos.filter((item) => item.completed).length;

  // rhf setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // will run on valid form submit
  function onSubmit(data) {
    console.log(data);
    const text = data.todoText?.trim();
    if (!text) return;
    dispatch({ type: "ADD_TODO", payload: text });
    reset();
  }

  return (
    <div className="app">
      <h1>Todo App - useReducer & RHF</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className={errors.todoText && 'inputError'}
          {...register("todoText", {
            required: "Please enter a todo",
            minLength: { value: 2, message: "Enter atleast 2 character" },
          })}
          placeholder="Enter your todo"
        />
        <button type="submit">Add Todo</button>
        {errors.todoText && (
          <p className={errors.todoText && 'errorMessage'}>
            {errors.todoText.message}
          </p>
        )}
      </form>

      {/* total todos and completed todos count */}
      <p>
        <span>
          Total : <b>{total}</b>
        </span>{" "}
        <span>
          Completed : <b>{completed}</b>
        </span>
      </p>
      {/* show list */}
      <ul>
        {state.todos.map((item) => (
          <li
            key={item.id}
            onClick={() => dispatch({ type: "TOGGLE_TODO", payload: item.id })}
          >
            <input type="checkbox" checked={item.completed} readOnly />
            <span className={item.completed && 'todoCompleted'}>{item.text}</span>
            <button
              onClick={() =>
                dispatch({ type: "DELETE_TODO", payload: item.id })
              }
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
