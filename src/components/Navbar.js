import Link from "next/link";
import { RightArea } from "./RightArea";

function LeftArea() {
  return (
    <div>
      <Link href="/" className="text-2xl font-bold">
        My Todo
      </Link>
    </div>
  );
}

/**
 * @param {{ children: React.ReactNode }} param0
 */
export default function Navbar({ children }) {
  return (
    <header className="w-full h-12 shadow-md dark:bg-black">
      <div className="container h-full m-auto flex justify-between items-center">
        <LeftArea />
        <RightArea>{children}</RightArea>
      </div>
    </header>
  );
}
