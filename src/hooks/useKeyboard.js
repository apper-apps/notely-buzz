import { useEffect } from "react";

export const useKeyboard = (shortcuts) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key, metaKey, ctrlKey, shiftKey, altKey } = event;
      const isModifierPressed = metaKey || ctrlKey;

      // Check each shortcut
      shortcuts.forEach(({ keys, action, preventDefault = true }) => {
        const [modifier, targetKey] = keys.split("+");
        
        if (modifier === "cmd" || modifier === "ctrl") {
          if (isModifierPressed && key.toLowerCase() === targetKey.toLowerCase()) {
            if (preventDefault) {
              event.preventDefault();
            }
            action(event);
          }
        } else if (modifier === "shift") {
          if (shiftKey && key.toLowerCase() === targetKey.toLowerCase()) {
            if (preventDefault) {
              event.preventDefault();
            }
            action(event);
          }
        } else if (modifier === "alt") {
          if (altKey && key.toLowerCase() === targetKey.toLowerCase()) {
            if (preventDefault) {
              event.preventDefault();
            }
            action(event);
          }
        } else if (key.toLowerCase() === keys.toLowerCase()) {
          if (preventDefault) {
            event.preventDefault();
          }
          action(event);
        }
      });
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [shortcuts]);
};