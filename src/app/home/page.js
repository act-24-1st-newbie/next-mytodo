import { redirect } from "next/navigation";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

import { SubmitButton } from "@/components/SubmitButton";
import TaskCreateForm from "./TaskCreateForm";
import TaskList from "./TaskList";
import { revalidatePath } from "next/cache";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TaskWrapper from "./TaskWrapper";

/**
 * Sign Out
 */
async function signout() {
  "use server";
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/");
}

/**
 * Create a Task
 * @param {FormData} formData
 */
async function create(formData) {
  "use server";

  const task = formData.get("task");
  if (task) {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error } = await supabase.from("tasks").insert({
      contents: task,
      is_done: false,
      user_id: user.id,
    });

    if (error) {
      console.error(error);
    } else {
      revalidatePath("/home");
    }
  }
}

/**
 * Delete a task
 * @param {number} id
 */
async function del(id) {
  "use server";
  const supabase = createClient();
  await supabase.auth.getUser();
  const { error } = await supabase.from("tasks").delete().eq("id", id);
  if (error) {
    console.error(error);
  } else {
    revalidatePath("/home");
  }
}

/**
 * Delete All Tasks
 */
async function deleteAll() {
  "use server";
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { error } = await supabase.from("tasks").delete().eq("user_id", user.id);
  if (error) {
    console.error(error);
  } else {
    revalidatePath("/home");
  }
}

/**
 * Upadate a task about checked status
 * @param {number} id
 * @param {FormData} formData
 */
async function updateCheck(id, formData) {
  "use server";
  const isDone = formData.get("is-done") === "on";
  const supabase = createClient();
  await supabase.auth.getUser();
  const { error } = await supabase
    .from("tasks")
    .update({ is_done: isDone, modified_date: new Date() })
    .eq("id", id);
  if (error) {
    console.error(error);
  } else {
    revalidatePath("/home");
  }
}

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
          <TaskCreateForm action={create} />
        </div>
        <TaskWrapper tasks={tasks} del={del} deleteAll={deleteAll} updateCheck={updateCheck} />
      </main>
    </>
  );
}
