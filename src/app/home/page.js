import { redirect } from "next/navigation";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

import TaskCreateForm from "./TaskCreateForm";
import TaskList from "./TaskList";
import { SubmitButton } from "@/components/ui/SubmitButton";

export default async function Home() {
  const name = await getUserName();
  if (!name) {
    redirect("/");
  }

  async function getUserName() {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    return data?.user?.email;
  }

  async function signout() {
    "use server";
    const supabase = createClient();
    await supabase.auth.signOut();
    redirect("/");
  }

  /** @param {FormData} formData */
  async function create(formData) {
    "use server";

    const task = formData.get("task");
    if (task) {
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
  }

  async function del(id) {
    "use server";
    const supabase = createClient();
    await supabase.auth.getUser();
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) {
      console.error(error);
      return;
    }
    redirect("/home");
  }

  async function deleteAll() {
    "use server";
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    const { error } = await supabase.from("tasks").delete().eq("user_id", data.user.id);
    if (error) {
      console.error(error);
      return;
    }
    redirect("/home");
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
          <p className="text-2xl">Good afternoon, {name}!</p>
          <TaskCreateForm action={create} />
        </div>
        <div>
          <div className="container flex justify-between items-center mt-4">
            <div>Oldest</div>
            <form action={deleteAll}>
              <SubmitButton variant="outline">Clear All</SubmitButton>
            </form>
          </div>
          <div className="container mt-4">
            <TaskList onDelete={del} />
          </div>
        </div>
      </main>
    </>
  );
}
