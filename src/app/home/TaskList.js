import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";

async function fetchData() {
  const supabase = createClient();
  await supabase.auth.getUser();
  const { data, error } = await supabase.from("tasks").select();

  if (error) {
    console.error(error);
    return [];
  }
  return data;
}

/**
 *
 * @param {{ task: object, onDelete: (formData: FormData) }} param0
 * @returns
 */
function TaskItem({ task, onDelete }) {
  return (
    <li className="h-[60px] border-[1px] border-gray-400 dark:border-white rounded-sm flex items-center gap-4 px-4">
      <input type="checkbox" value={task.is_done} />
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

export default async function TaskList({ onDelete }) {
  const data = await fetchData();
  return (
    <ul className="flex flex-col gap-2">
      {data.map((task) => (
        <TaskItem key={task.id} task={task} onDelete={onDelete} />
      ))}
    </ul>
  );
}
