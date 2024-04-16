"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

export function SubmitButton({ variant, children }) {
  const { pending } = useFormStatus();

  if (pending) {
    return (
      <Button variant={variant} disabled={pending}>
        <Loader className="h-4 w-4 animate-spin" />
      </Button>
    );
  }

  return <Button variant={variant}>{children}</Button>;
}
