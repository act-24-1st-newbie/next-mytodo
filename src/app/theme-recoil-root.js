"use client";

import { RecoilRoot, useRecoilValue } from "recoil";
import { themeState } from "@/lib/theme";
import { cn } from "@/lib/utils";

function ThemeWrapper({ children }) {
  const mode = useRecoilValue(themeState);
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
