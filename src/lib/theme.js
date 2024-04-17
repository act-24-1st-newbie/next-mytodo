"use client";

import { atom } from "recoil";

const themeState = atom({
  key: "mode",
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((newMode) => {
        localStorage.setItem("mode", newMode);
      });
    },
  ],
});

export { themeState };
