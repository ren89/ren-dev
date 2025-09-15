import type { TodoType } from "@/hooks/useTodo.type";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Pencil, PenOff, Save, Trash2, GripVertical } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function Todo({
  todo,
  onRemove,
  onToggle,
  onEdit,
}: {
  todo: TodoType;
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
  onEdit: (id: string, newItem: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState(todo.item);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const handleEdit = () => {
    if (isEditing) {
      const trimmed = editedItem.trim();
      if (trimmed && trimmed !== todo.item) {
        onEdit(todo.id, editedItem);
      } else {
        setEditedItem(todo.item);
      }
    }
    setIsEditing(!isEditing);
  };

  const EditIcon = () => {
    if (!isEditing) return <Pencil size={24} />;
    return todo.item === editedItem ? <PenOff size={24} /> : <Save size={24} />;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleEdit();
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors ${
        isDragging ? "opacity-50 shadow-lg" : ""
      }`}
    >
      <div className="gap-3 flex items-center flex-1">
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-300 p-1"
        >
          <GripVertical size={16} />
        </div>

        <Checkbox
          id={todo.id}
          checked={todo.completed}
          className="border-2 border-gray-400 data-[state=checked]:border-green-500 data-[state=checked]:bg-green-500"
          onCheckedChange={() => onToggle(todo.id)}
        />
        {isEditing ? (
          <Input
            value={editedItem}
            onChange={(e) => setEditedItem(e.target.value)}
            className="bg-transparent border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-white"
            autoFocus
            onKeyDown={handleKeyDown}
          />
        ) : (
          <Label
            htmlFor={todo.id}
            className={`flex-1 cursor-pointer ${
              todo.completed ? "line-through text-gray-400" : "text-white"
            }`}
          >
            {todo.item}
          </Label>
        )}
      </div>
      <div className="flex gap-1">
        <Button
          onClick={handleEdit}
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-blue-400 hover:bg-blue-400/10"
        >
          <EditIcon />
        </Button>
        <Button
          onClick={() => onRemove(todo.id)}
          disabled={isEditing}
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-red-400 hover:bg-red-400/10"
        >
          <Trash2 size={18} />
        </Button>
      </div>
    </div>
  );
}
