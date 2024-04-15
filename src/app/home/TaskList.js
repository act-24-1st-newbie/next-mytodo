import { createClient } from "@/lib/supabase/server";

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

export default async function TaskList() {
  const data = await fetchData();
  return (
    <ul>
      {data.map((task) => (
        <li key={task.id}>{task.contents}</li>
      ))}
    </ul>
  );
}
