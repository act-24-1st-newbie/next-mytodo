"use client";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import TaskCheckbox from "./TaskCheckbox";

/**
 * @param {{
 * task: object,
 * onDelete: (formData: FormData) => void,
 * onUpdateCheck: (formData: FormData) => void
 * }} param0
 * @returns
 */
export default function TaskItem({ task, onDelete, onUpdateCheck }) {
  const [check, setCheck] = useState(task.is_done);

  /** @param {React.ChangeEvent<HTMLInputElement>} e */
  function handleChange(e) {
    setCheck(e.currentTarget.checked);
  }

  return (
    <li className="h-[60px] border-[1px] border-gray-400 dark:border-white rounded-sm flex items-center gap-4 px-4">
      <form action={onUpdateCheck.bind(null, task.id)}>
        <TaskCheckbox defaultChecked={check} onChange={handleChange} />
      </form>
      <span className={cn("grow", { "line-through text-gray-400": check })}>{task.contents}</span>
      <span>{format(task.created_date, "MM/dd HH:mm")}</span>
      <form action={onDelete.bind(null, task.id)}>
        <Button variant="destructive" size="icon">
          <Trash2 className="h-4 w-4" />
        </Button>
      </form>
    </li>
  );
}
