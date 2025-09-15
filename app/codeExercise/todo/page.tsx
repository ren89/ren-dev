"use client";

import { useTodo } from "@/hooks/useTodo";
import { Todo } from "@/components/todo/Todo";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export default function TodoPage() {
  const taskRef = useRef<HTMLInputElement>(null);
  const {
    todos,
    addTodo,
    removeTodo,
    toggleTodo,
    editTodo,
    getTodosByStatus,
    reorderTodos,
  } = useTodo();
  const [activeTab, setActiveTab] = useState<
    "all" | "inProgress" | "completed"
  >("all");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const filteredTodos = getTodosByStatus(activeTab);
      const oldIndex = filteredTodos.findIndex((item) => item.id === active.id);
      const newIndex = filteredTodos.findIndex((item) => item.id === over?.id);

      reorderTodos(oldIndex, newIndex);
    }
  };

  const handleAddTodo = () => {
    if (taskRef.current?.value) {
      addTodo(taskRef.current.value);
      taskRef.current.value = "";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTodo();
    }
  };

  const filteredTodos = getTodosByStatus(activeTab);

  return (
    <div className="flex flex-col gap-6 max-w-[600px] mx-auto my-12 px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          To Do
        </h1>
        <p className="text-gray-400">Stay organized and get things done</p>
      </div>

      <div className="flex justify-between items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
        <div className="flex-1">
          <Input
            placeholder="What needs to be done?"
            className="text-white bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg"
            ref={taskRef}
            onKeyDown={handleKeyDown}
          />
        </div>
        <Button
          onClick={handleAddTodo}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6"
        >
          <Plus size={20} className="mr-2" />
          Add
        </Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(value) =>
          setActiveTab(value as "all" | "inProgress" | "completed")
        }
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3 bg-white/5 border border-white/10">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            All ({todos.length})
          </TabsTrigger>
          <TabsTrigger
            value="inProgress"
            className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            In Progress ({getTodosByStatus("inProgress").length})
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
          >
            Completed ({getTodosByStatus("completed").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={filteredTodos.map((todo) => todo.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-2">
                {filteredTodos.map((todo) => (
                  <Todo
                    key={todo.id}
                    todo={todo}
                    onRemove={removeTodo}
                    onToggle={toggleTodo}
                    onEdit={editTodo}
                  />
                ))}
                {filteredTodos.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📝</div>
                    <p className="text-gray-400 text-lg">No todos found</p>
                    <p className="text-gray-500 text-sm">
                      Add a new todo to get started!
                    </p>
                  </div>
                )}
              </div>
            </SortableContext>
          </DndContext>
        </TabsContent>

        <TabsContent value="inProgress" className="mt-4">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={filteredTodos.map((todo) => todo.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-2">
                {filteredTodos.map((todo) => (
                  <Todo
                    key={todo.id}
                    todo={todo}
                    onRemove={removeTodo}
                    onToggle={toggleTodo}
                    onEdit={editTodo}
                  />
                ))}
                {filteredTodos.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🚀</div>
                    <p className="text-gray-400 text-lg">
                      No in-progress todos
                    </p>
                    <p className="text-gray-500 text-sm">
                      All caught up! Great job!
                    </p>
                  </div>
                )}
              </div>
            </SortableContext>
          </DndContext>
        </TabsContent>

        <TabsContent value="completed" className="mt-4">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={filteredTodos.map((todo) => todo.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-2">
                {filteredTodos.map((todo) => (
                  <Todo
                    key={todo.id}
                    todo={todo}
                    onRemove={removeTodo}
                    onToggle={toggleTodo}
                    onEdit={editTodo}
                  />
                ))}
                {filteredTodos.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🎯</div>
                    <p className="text-gray-400 text-lg">No completed todos</p>
                    <p className="text-gray-500 text-sm">
                      Complete some tasks to see them here!
                    </p>
                  </div>
                )}
              </div>
            </SortableContext>
          </DndContext>
        </TabsContent>
      </Tabs>
    </div>
  );
}
