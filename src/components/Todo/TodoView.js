import { useEffect, useState } from "react";
import { AppConstants } from "../../contants";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";

export function TodoView() {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState({});

  useEffect(() => {
    try {
      const todosRaw = localStorage.getItem(AppConstants.TODOS);
      const todosData = JSON.parse(todosRaw);
      if (Array.isArray(todosData)) {
        setTodos(todosData.sort((a, b) => a.id - b.id));
      }
    } catch (err) {
      console.error("Err: ", err);
    }
  }, []);

  const handleSaveTodo = (newTodo) => {
    let newTodosState = todos;
    console.log("handleSaveTodo", newTodo);
    if (newTodo.id) {
      // Update
      newTodosState = todos.map((todo) => {
        return todo.id === newTodo.id
          ? {
              ...todo,
              ...newTodo,
            }
          : todo;
      });
    } else {
      // Add
      newTodosState = [
        ...todos,
        { ...newTodo, id: Date.now(), checked: false },
      ];
    }
    newTodosState.sort((a, b) => a.id - b.id);
    localStorage.setItem(AppConstants.TODOS, JSON.stringify(newTodosState));
    setTodos(newTodosState);
  };

  const deleteTodo = (toBeDeleted, soft) => {
    console.log("Delete Triggered", { toBeDeleted, soft });
    let newTodosState = todos;
    if (toBeDeleted.id) {
      if (soft) {
        newTodosState = todos.map((todo) => {
          return todo.id === toBeDeleted.id
            ? {
                ...todo,
                deleted: true,
              }
            : todo;
        });
      } else {
        newTodosState = todos.filter((item) => item.id !== toBeDeleted.id);
      }
      setTodos(newTodosState);
      localStorage.setItem(AppConstants.TODOS, JSON.stringify(newTodosState));
    }
  };

  return (
    <div className="flex-1 flex flex-col gap-2 bg-indigo-600 rounded p-2">
      <TodoForm todo={selectedTodo} saveTodo={handleSaveTodo} />
      <div className="flex justify-center font-bold text-white">ToDos</div>
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          setSelectedTodo={setSelectedTodo}
          todo={todo}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
}
