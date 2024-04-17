import { redirect } from "next/navigation";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { signout } from "@/lib/actions";

import TaskCreateForm from "./TaskCreateForm";
import TaskWrapper from "./TaskWrapper";

/**
 * Home Page
 * @constructor
 */
export default async function Home() {
  const supabase = createClient();
  const name = await getUserName();
  if (!name) {
    redirect("/", "replace");
  }

  const tasks = await getTasks();

  async function getUserName() {
    const { data } = await supabase.auth.getUser();
    return data?.user?.email?.split("@")?.[0];
  }

  async function getTasks() {
    const { data, error } = await supabase.from("tasks").select().order("id");
    if (error) {
      console.error(error);
      return [];
    }
    return data;
  }

  function getTaskCount() {
    return `${tasks.filter((t) => !t.is_done).length} / ${tasks.length}`;
  }

  return (
    <>
      <Navbar>
        <form action={signout}>
          <Button type="submit" variant="outline" size="sm">
            Sign Out
          </Button>
        </form>
      </Navbar>
      <main className="py-8">
        <div className="container">
          <p className="text-2xl">Good afternoon, {name}!</p>
          <p className="text-2xl mt-4">You&apos;ve got</p>
          <p className="text-[3rem] font-bold">{getTaskCount()}</p>
          <p className="text-2xl">task(s) today!</p>
          <TaskCreateForm />
        </div>
        <TaskWrapper tasks={tasks} />
      </main>
    </>
  );
}
