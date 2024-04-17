import { createClient } from "@/lib/supabase/server";
import TaskItem from "./TaskItem";

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
