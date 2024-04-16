"use client";

import { format } from "date-fns";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRecoilState, useRecoilValue } from "recoil";
import { themeState } from "@/lib/theme";
import { useEffect } from "react";

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
function RightArea({ children }) {
  const [mode, setMode] = useRecoilState(themeState);

  useEffect(() => {
    setMode(localStorage.getItem("mode") ?? "light");
  }, [setMode]);

  function handleModeClick() {
    setMode(mode === "light" ? "dark" : "light");
  }
  function getNow() {
    return format(new Date(), "MM/dd(eee)");
  }
  return (
    <div className="flex gap-2 items-center">
      <Button size="icon" variant="ghost" onClick={handleModeClick}>
        {mode === "light" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>
      <span className="font-bold">{getNow()}</span>
      <div>{children}</div>
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
