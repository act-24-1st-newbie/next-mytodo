"use server";

import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";
import { revalidatePath } from "next/cache";

const supabase = createClient();

/**
 * SignIn
 * @param {{ msg?: string }} prev
 * @param {FormData} formData
 */
export async function signIn(prev, formData) {
  const name = formData.get("name");
  if (!name) return;

  const { error } = await supabase.auth.signInWithPassword({
    email: name,
    password: "111111",
  });

  if (!error) {
    redirect("/home");
  } else {
    console.error(error);
    return {
      msg: error.message,
    };
  }
}

/**
 * Sign Out
 */
export async function signout() {
  await supabase.auth.signOut();
  redirect("/");
}

/**
 * Create a Task
 * @param {FormData} formData
 */
export async function createTask(formData) {
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
export async function del(id) {
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
export async function deleteAll() {
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
export async function updateCheck(id, formData) {
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
