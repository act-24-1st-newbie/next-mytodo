import { atom } from "recoil";

const themeState = atom({
  key: "mode",
  default: localStorage.getItem("mode") ?? "light",
  effects: [
    ({ onSet }) => {
      onSet((newMode) => {
        localStorage.setItem("mode", newMode);
      });
    },
  ],
});

export { themeState };
