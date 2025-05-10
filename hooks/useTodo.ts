import { useEffect, useState } from "react";
import type { TodoType, TodoListType } from "./useTodo.type";
import { todoStorage } from "@/utils/storage";

export function useTodo(): TodoListType {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedTodos = todoStorage.get();
    if (storedTodos) {
      setTodos(storedTodos);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      todoStorage.set(todos);
    }
  }, [todos, isLoaded]);

  return {
    todos,
    addTodo: (item) => {
      if (!item.trim()) return;
      setTodos((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          item,
          completed: false,
        },
      ]);
    },
    removeTodo: (id) => {
      console.log("removeTodo is called");
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    },
    toggleTodo: (id) => {
      console.log("toggleTodo is called");
      setTodos((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, completed: !item.completed } : item
        )
      );
    },
    editTodo: (id, newItem) => {
      setTodos((prev) =>
        prev.map((item) => (item.id === id ? { ...item, item: newItem } : item))
      );
    },
  };
}
