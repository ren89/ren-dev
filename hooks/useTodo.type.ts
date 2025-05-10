export type TodoType = {
  id: string;
  item: string;
  completed: boolean;
};

export type TodoListType = {
  todos: TodoType[];
  addTodo: (item: string) => void;
  removeTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  editTodo: (id: string, newItem: string) => void;
};
