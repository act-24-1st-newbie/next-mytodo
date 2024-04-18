"use client";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { format } from "date-fns";

import { SubmitButton } from "@/components/SubmitButton";
import { cn } from "@/lib/utils";
import { del, updateCheck } from "@/lib/actions";

import TaskCheckbox from "./TaskCheckbox";

/**
 * @param {{
 * task: object,
 * }} param0
 * @returns
 */
export default function TaskItem({ task }) {
  const [check, setCheck] = useState(task.is_done);
  const [createdAt, setCreatedAt] = useState(null);

  /** @param {React.ChangeEvent<HTMLInputElement>} e */
  function handleChange(e) {
    setCheck(e.currentTarget.checked);
  }

  useEffect(() => {
    setCreatedAt(format(new Date(task.created_date), "MM/dd HH:mm"));
  }, []);

  return (
    <li className="h-[60px] border-[1px] border-gray-400 dark:border-white rounded-sm flex items-center gap-4 px-4">
      <form action={updateCheck.bind(null, task.id)}>
        <TaskCheckbox defaultChecked={check} onChange={handleChange} />
      </form>
      <span className={cn("grow", { "line-through text-gray-400": check })}>{task.contents}</span>
      <span>{createdAt ? createdAt : "00/00 00:00"}</span>
      <form action={del.bind(null, task.id)}>
        <SubmitButton variant="destructive" size="icon">
          <Trash2 className="h-4 w-4" />
        </SubmitButton>
      </form>
    </li>
  );
}
