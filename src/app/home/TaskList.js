import { format } from "date-fns";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

import TaskCheckbox from "./TaskCheckbox";

/**
 * @param {{
 * task: object,
 * onDelete: (formData: FormData) => void,
 * onUpdateCheck: (formData: FormData) => void
 * }} param0
 * @returns
 */
function TaskItem({ task, onDelete, onUpdateCheck }) {
  return (
    <li className="h-[60px] border-[1px] border-gray-400 dark:border-white rounded-sm flex items-center gap-4 px-4">
      <form action={onUpdateCheck?.bind(null, task.id)}>
        <TaskCheckbox defaultChecked={task.is_done} />
      </form>
      <span className="grow">{task.contents}</span>
      <span>{format(task.created_date, "MM/dd HH:mm")}</span>
      <form action={onDelete.bind(null, task.id)}>
        <Button variant="destructive" size="icon">
          <Trash2 className="h-4 w-4" />
        </Button>
      </form>
    </li>
  );
}

/**
 * TaskList Component
 *
 * @param {{
 * onDelete: (formData: FormData) => void,
 * onUpdateCheck: (formData: FormData) => void
 * }} param0
 */
export default async function TaskList({ onDelete, onUpdateCheck }) {
  const data = await fetchData();

  async function fetchData() {
    const supabase = createClient();
    await supabase.auth.getUser();

    /**
     * @type {{data: {id: number; contents: string; is_done: boolean}[]}}
     */
    const { data, error } = await supabase.from("tasks").select().order("id");

    if (error) {
      console.error(error);
      return [];
    }
    return data;
  }

  return (
    <ul className="flex flex-col gap-2">
      {data.map((task) => (
        <TaskItem key={task.id} task={task} onDelete={onDelete} onUpdateCheck={onUpdateCheck} />
      ))}
    </ul>
  );
}
