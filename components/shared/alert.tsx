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

export function Alert({
  children,
  title,
  description,
  cancelText,
  actionText,
  showCloseButton = false,
}: {
  children: React.ReactNode;
  title?: string;
  description?: string | React.ReactNode;
  cancelText?: string;
  actionText?: string;
  showCloseButton?: boolean;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full">{children}</AlertDialogTrigger>
      <AlertDialogContent className="bg-slate-900 p-1 ">
        {showCloseButton && (
          <div className="w-full text-end h-auto">
            <AlertDialogCancel className="p-0 m-0 text-white bg-transparent border-0 h-auto">
              <XCircleIcon />
            </AlertDialogCancel>
          </div>
        )}

        <AlertDialogHeader className="px-5">
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {cancelText && (
            <AlertDialogCancel className="bg-[#fff] text-black">
              {cancelText}
            </AlertDialogCancel>
          )}
          {actionText && (
            <AlertDialogAction className="bg-[#1e2e54]">
              {actionText}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
