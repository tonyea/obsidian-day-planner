import { Keymap } from "obsidian";
import { readable } from "svelte/store";

export function useModPressed() {
  return readable(false, (set) => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (Keymap.isModifier(event, "Mod")) {
        set(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (!Keymap.isModifier(event, "Mod")) {
        set(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  });
}
