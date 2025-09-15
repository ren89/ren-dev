export type TodoType = {
  id: string;
  item: string;
  completed: boolean;
  status: "inProgress" | "completed";
  order?: number; // Optional for backward compatibility
};

export type TodoListType = {
  todos: TodoType[];
  addTodo: (item: string) => void;
  removeTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  editTodo: (id: string, newItem: string) => void;
  updateStatus: (id: string, status: "inProgress" | "completed") => void;
  getTodosByStatus: (status: "all" | "inProgress" | "completed") => TodoType[];
  reorderTodos: (startIndex: number, endIndex: number) => void;
};
