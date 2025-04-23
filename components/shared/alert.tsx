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
import { XCircleIcon } from "lucide-react";
import React from "react";

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
      <AlertDialogContent className="bg-slate-900 p-4 rounded-2xl w-full sm:w-[60%] justify-center">
        {showCloseButton && (
          <div className="absolute right-4 top-3">
            <AlertDialogCancel
              className="p-0 m-0 text-white bg-transparent border-0 h-auto"
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
            <AlertDialogCancel
              className="bg-[#fff] text-black"
              onClick={onClose}
            >
              {cancelText}
            </AlertDialogCancel>
          )}
          {actionText && (
            <AlertDialogAction className="bg-[#1e2e54] rounded hover:bg-teal-400/10 hover:text-teal-300">
              {actionText}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
