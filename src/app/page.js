import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default function Home() {
  /** @param {FormData} formData */
  async function signin(formData) {
    "use server";
    const name = formData.get("name");
    if (!name) return;

    // Todo: Supabase signin
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: name,
      password: "111111",
    });

    if (!error) {
      redirect("/home");
    } else {
      console.error(error);
    }
  }

  return (
    <>
      <Navbar />
      <main className="py-4">
        <div className="container">
          <form action={signin}>
            <h1 className="text-[3rem] leading-normal font-bold">What is your name?</h1>
            <div className="flex gap-4">
              <Input type="text" placeholder="Input your name" name="name" />
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
