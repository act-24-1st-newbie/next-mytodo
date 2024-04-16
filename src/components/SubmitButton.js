"use client";

import { useFormStatus } from "react-dom";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} param0
 */
export function SubmitButton({ children, disabled, ...rest }) {
  /** @type {{ pending: boolean }} */
  const { pending } = useFormStatus();

  if (pending) {
    return (
      <Button {...rest} size="icon" disabled={pending}>
        <Loader className="h-4 w-4 animate-spin" />
      </Button>
    );
  }

  return <Button {...rest}>{children}</Button>;
}
