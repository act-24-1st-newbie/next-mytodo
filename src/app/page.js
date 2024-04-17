import Link from "next/link";
import Navbar from "@/components/Navbar";
import { SignInForm } from "./SignInForm";

/**
 * Login Page
 */
export default function SignIn() {
  return (
    <>
      <Navbar />
      <main className="py-4">
        <div className="container">
          <SignInForm />
          <div className="mt-4 text-sm">
            <Link href="/home">To Home &gt;</Link>
          </div>
        </div>
      </main>
    </>
  );
}
