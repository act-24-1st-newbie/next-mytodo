"use client";
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * @typedef {{
 *  action: (formData: FormData) => Promise<void>;
 * }} TaskFormProps
 *
 * @param {TaskFormProps}} param0
 * @returns
 */
export default function TaskForm({ action }) {
  /** @type {React.MutableRefObject<HTMLFormElement>} */
  const formRef = useRef(null);
  async function doAction(formData) {
    await action(formData);
    formRef.current?.reset();
  }

  return (
    <form action={doAction} ref={formRef}>
      <div className="flex gap-4 mt-4">
        <Input type="text" placeholder="Input your task" name="task" />
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
