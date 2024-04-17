"use client";

import { RecoilRoot, useRecoilState } from "recoil";
import { cn } from "@/lib/utils";
import { themeState } from "@/lib/theme";
import { useEffect } from "react";

function ThemeBody({ children }) {
  const [mode, setMode] = useRecoilState(themeState);
  useEffect(() => {
    setMode(localStorage.getItem("mode") ?? "light");
  }, [setMode]);

  if (mode) {
    return <body className={cn(mode, "dark:bg-slate-800")}>{children}</body>;
  }
  return <></>;
}

/** @param {{ children: React.ReactNode }} param0 */
export default function ThemeRecoilRoot({ children }) {
  return (
    <RecoilRoot>
      <ThemeBody>{children}</ThemeBody>
    </RecoilRoot>
  );
}
