import type { TodoType } from "@/hooks/useTodo.type";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Pencil, PenOff, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

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

  return (
    <div className="flex items-center justify-between">
      <div className="gap-2 flex items-center flex-1">
        <Checkbox
          id={todo.id}
          checked={todo.completed}
          className={`border-${
            todo.completed ? "green" : "gray"
          }-300 peer disabled:cursor-not-allowed disabled:opacity-70 `}
          onCheckedChange={() => onToggle(todo.id)}
        />
        {isEditing ? (
          <Input
            value={editedItem}
            onChange={(e) => setEditedItem(e.target.value)}
            className="bg-transparent border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 "
            autoFocus
          />
        ) : (
          <Label htmlFor={todo.id}>{todo.item}</Label>
        )}
      </div>
      <div>
        <Button onClick={handleEdit} className="text-blue-400">
          <EditIcon />
        </Button>
        <Button
          onClick={() => onRemove(todo.id)}
          disabled={isEditing}
          className="text-red-400 "
        >
          <Trash2 size={24} />
        </Button>
      </div>
    </div>
  );
}
