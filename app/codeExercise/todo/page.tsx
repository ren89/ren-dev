"use client";

import { useTodo } from "@/hooks/useTodo";
import { Todo } from "@/components/todo/Todo";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function TodoPage() {
  const taskRef = useRef<HTMLInputElement>(null);
  const { todos, addTodo, removeTodo, toggleTodo, editTodo } = useTodo();

  const handleAddTodo = () => {
    if (taskRef.current?.value) {
      addTodo(taskRef.current.value);
      taskRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-2 max-w-[600px] mx-auto my-12  ">
      <h1 className="text-4xl font-bold  mb-8">To Do</h1>
      <div className="flex justify-between items-end gap-4 mb-4">
        <div className="border-b-2 w-full">
          <Input
            placeholder="Add Item"
            className="text-white bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            ref={taskRef}
          />
        </div>
        <Button variant={"secondary"} onClick={handleAddTodo}>
          <Plus size={24} />
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onRemove={removeTodo}
            onToggle={toggleTodo}
            onEdit={editTodo}
          />
        ))}
      </div>
    </div>
  );
}
