"use client";

import { Sun, Moon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

/**
 * @param {{ children: React.ReactNode }} param0
 */
export function RightArea({ children }) {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    setMode(localStorage.getItem("mode") ?? "light");
  }, []);

  useEffect(() => {
    if (mode === "dark") {
      document.querySelector("body").classList.add("dark");
    } else {
      document.querySelector("body").classList.remove("dark");
    }
    localStorage.setItem("mode", mode);
  }, [mode]);

  function handleModeClick() {
    setMode(mode === "light" ? "dark" : "light");
  }

  function getNow() {
    return format(new Date(), "MM/dd(eee)");
  }

  return (
    <div className="flex gap-4 items-center">
      <Button size="icon" variant="ghost" onClick={handleModeClick}>
        {mode === "light" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>
      <span className="font-bold">{getNow()}</span>
      <div>{children}</div>
    </div>
  );
}
