"use client";
import React, { useRef } from "react";
import { useFormStatus } from "react-dom";

import { Input as UIInput } from "@/components/ui/input";
import { SubmitButton } from "@/components/SubmitButton";
import { SendHorizonal } from "lucide-react";

function Input({ disabled: ignore, ...props }) {
  const { pending } = useFormStatus();

  return <UIInput {...props} disabled={pending} />;
}

/**
 * @typedef {{
 *  action: (formData: FormData) => Promise<void>;
 * }} TaskFormProps
 *
 * @param {TaskFormProps}} param0
 * @returns
 */
export default function TaskCreateForm({ action }) {
  /** @type {React.MutableRefObject<HTMLFormElement>} */
  const formRef = useRef(null);

  async function doAction(formData) {
    formRef.current?.reset();
    await action(formData);
  }

  return (
    <form action={doAction} ref={formRef}>
      <div className="flex gap-4 mt-4">
        <Input type="text" placeholder="Input your task" name="task" />
        <SubmitButton size="icon">
          <SendHorizonal className="h-4 w-4" />
        </SubmitButton>
      </div>
    </form>
  );
}
