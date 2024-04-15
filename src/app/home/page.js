import { redirect } from "next/navigation";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

export const ssr = false;

export default function Home() {
  async function signout() {
    "use server";
    const supabase = createClient();
    await supabase.auth.signOut();
    redirect("/");
  }

  /** @param {FormData} formData */
  async function save(formData) {
    "use server";

    const task = formData.get("task");
    const supabase = createClient();

    const { data } = await supabase.auth.getUser();
    const { error } = await supabase.from("tasks").insert({
      contents: task,
      is_done: false,
      user_id: data.user.id,
    });

    if (error) {
      console.error(error);
    } else {
      redirect("/home");
    }
  }

  return (
    <>
      <Navbar>
        <form action={signout}>
          <Button type="submit" variant="ghost">
            Sign Out
          </Button>
        </form>
      </Navbar>
      <main className="py-4">
        <div className="container">
          <p className="text-2xl">Good afternoon!</p>
          <TaskForm action={save} />
        </div>
        <div className="mt-4">
          <div className="container">
            <TaskList />
          </div>
        </div>
      </main>
    </>
  );
}
