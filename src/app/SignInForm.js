"use client";
import { useFormState } from "react-dom";
import { SendHorizonal } from "lucide-react";

import { SubmitButton } from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";

import { signIn } from "@/lib/actions";

const initState = {
  msg: null,
};

/**
 *
 * @param {(state: { msg?: string }, formData: FormData) => { msg?: string }} action
 * @returns
 */
export function SignInForm() {
  const [formState, formAction] = useFormState(signIn, initState);

  return (
    <form action={formAction}>
      <h1 className="text-[3rem] leading-normal font-bold">What is your name?</h1>
      <div className="flex gap-4">
        <Input type="text" placeholder="Input your name" name="name" />
        <SubmitButton type="submit" size="icon">
          <SendHorizonal className="h-4 w-4" />
        </SubmitButton>
      </div>
      {formState?.msg && (
        <p className="text-xs text-red-600 dark:text-red-400 mt-2">{formState.msg}</p>
      )}
    </form>
  );
}
