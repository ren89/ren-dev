import React from "react";
import { XCircleIcon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function Alert({
  children,
  title,
  description,
  cancelText,
  actionText,
  showCloseButton = false,
  isOpen,
  onClose,
}: {
  children?: React.ReactNode;
  title?: string;
  description?: string | React.ReactNode;
  cancelText?: string;
  actionText?: string;
  showCloseButton?: boolean;
  isOpen?: boolean; // Optional for programmatic control
  onClose?: () => void; // Optional for programmatic control
}) {
  const isControlled = typeof isOpen === "boolean";

  return (
    <AlertDialog
      open={isControlled ? isOpen : undefined}
      onOpenChange={onClose}
    >
      {!isControlled && children && (
        <AlertDialogTrigger className="w-full">{children}</AlertDialogTrigger>
      )}
      <AlertDialogContent className="w-full justify-center rounded-2xl p-4 sm:w-[60%]">
        {showCloseButton && (
          <div className="absolute right-4 top-3">
            <AlertDialogCancel
              className="m-0 h-auto border-0 bg-transparent p-0 text-muted-foreground hover:text-foreground"
              onClick={onClose}
            >
              <XCircleIcon size={26} />
            </AlertDialogCancel>
          </div>
        )}

        <AlertDialogHeader>
          <AlertDialogTitle className="text-3xl">{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex !justify-center">
          {cancelText && (
            <AlertDialogCancel onClick={onClose}>{cancelText}</AlertDialogCancel>
          )}
          {actionText && (
            <AlertDialogAction>{actionText}</AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
