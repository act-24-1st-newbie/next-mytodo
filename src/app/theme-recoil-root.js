"use client";

import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { cn } from "@/lib/utils";
import { themeState } from "@/lib/theme";
import { useEffect } from "react";

function ThemeWrapper({ children }) {
  const [mode, setMode] = useRecoilState(themeState);
  useEffect(() => {
    setMode(localStorage.getItem("mode") ?? "light");
  }, [setMode]);
  return <body className={cn(mode, "dark:bg-slate-800")}>{children}</body>;
}

/** @param {{ children: React.ReactNode }} param0 */
export default function ThemeRecoilRoot({ children }) {
  return (
    <RecoilRoot>
      <ThemeWrapper>{children}</ThemeWrapper>
    </RecoilRoot>
  );
}
