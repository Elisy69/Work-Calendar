import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, toggleComplete } from "../redux/todoSlice";

function TodoItem({ id, title, completed }) {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  function handleCheckBoxClick() {
    dispatch(toggleComplete({ id, completed: !completed }));
  }
  function hanldeDeleteClick() {
    dispatch(deleteTodo({ id }));
  }

  return (
    <li className="flex items-center ml-4 mt-2 w-72 h-8" id={id}>
      <input
        type="checkbox"
        onClick={() => {
          handleCheckBoxClick();
        }}
        defaultChecked={completed}
        className="mr-4 "
      />
      <span
        className={`text-xl font-todo w-56 ${
          completed ? "line-through text-slate-500" : ""
        }`}
      >
        {title}
      </span>
      <button
        onClick={() => {
          hanldeDeleteClick();
        }}
        className="text-sm"
      >
        Delete
      </button>
    </li>
  );
}

export default TodoItem;
