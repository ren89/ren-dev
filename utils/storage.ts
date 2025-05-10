import { type TodoType } from "@/hooks/useTodo.type";

export const todoStorage = {
  get: (): TodoType[] => {
    try {
      return JSON.parse(localStorage.getItem("todos") || "null");
    } catch {
      return [];
    }
  },
  set: (value: any) => {
    localStorage.setItem("todos", JSON.stringify(value));
  },
};
