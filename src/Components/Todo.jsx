import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, toggleComplete } from "../redux/todoSlice";
import TodoItem from "./TodoItem";

function ToDo() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  function addNewTodo(event) {
    event.preventDefault();
    if (value) {
      dispatch(
        addTodo({
          title: value,
        })
      );
    }
    setValue("");
  }

  return (
    <div
      className="absolute  w-[20rem] h-full max-h-[53rem] top-[0rem] 
     left-[42rem] rounded-3xl backdrop-blur-lg bg-violet-500/30 flex flex-col "
    >
      <h1 className="text-5xl text-center pt-7 font-todo">Don't forget</h1>
      <ul>
        {todos.map((todo) => {
          return (
            <TodoItem
              id={todo.id}
              title={todo.title}
              completed={todo.completed}
              key={crypto.randomUUID()}
            ></TodoItem>
          );
        })}
      </ul>
      <input
        type="text"
        placeholder="Write your task here..."
        className=" ml-4 mb-2 mt-4 pl-4 w-72 h-8 rounded-full bg-pink-900  focus:bg-pink-800"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button
        onClick={addNewTodo}
        className="ml-28 bg-red-800 shadow-lg shadow-rose-800/50 w-24 h-8 rounded-full hover:bg-rose-900 hover:shadow-lg hover:shadow-rose-900/50 ease-in duration-100"
      >
        Add task
      </button>
    </div>
  );
}

export default ToDo;
