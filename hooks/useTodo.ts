import { useEffect, useState } from "react";
import type { TodoType, TodoListType } from "./useTodo.type";
import { todoStorage } from "@/utils/storage";

export function useTodo(): TodoListType {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedTodos = todoStorage.get();
    if (storedTodos) {
      // Multi-step migration for backward compatibility
      const migratedTodos = storedTodos.map(
        (
          todo: TodoType & {
            status?: "inProgress" | "completed";
            order?: number;
          },
          index: number
        ) => ({
          ...todo,
          status: todo.status || (todo.completed ? "completed" : "inProgress"),
          order: todo.order ?? index, // Use existing order or current position
        })
      );

      // Sort by order to ensure proper sequence
      const sortedTodos = migratedTodos.sort(
        (a, b) => (a.order || 0) - (b.order || 0)
      );
      setTodos(sortedTodos);
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
      setTodos((prev) => {
        // Get the highest order number + 1
        const maxOrder = Math.max(...prev.map((todo) => todo.order || 0), -1);
        return [
          ...prev,
          {
            id: crypto.randomUUID(),
            item,
            completed: false,
            status: "inProgress",
            order: maxOrder + 1, // Always assign next order
          },
        ];
      });
    },
    removeTodo: (id) => {
      console.log("removeTodo is called");
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    },
    toggleTodo: (id) => {
      console.log("toggleTodo is called");
      setTodos((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                completed: !item.completed,
                status: !item.completed ? "completed" : "inProgress",
              }
            : item
        )
      );
    },
    editTodo: (id, newItem) => {
      setTodos((prev) =>
        prev.map((item) => (item.id === id ? { ...item, item: newItem } : item))
      );
    },
    updateStatus: (id, status) => {
      setTodos((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                status,
                completed: status === "completed",
              }
            : item
        )
      );
    },
    getTodosByStatus: (status) => {
      if (status === "all") return todos;
      return todos.filter((todo) => todo.status === status);
    },
    reorderTodos: (startIndex, endIndex) => {
      setTodos((prev) => {
        const result = Array.from(prev);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        // Update order values to maintain consistency
        return result.map((todo, index) => ({
          ...todo,
          order: index,
        }));
      });
    },
  };
}
