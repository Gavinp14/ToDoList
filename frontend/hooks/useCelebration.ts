import { useEffect, useRef } from "react";
import { fireSuccessConfetti } from "@/lib/animations";

export const useTodoCelebration = (todos: any[]) => {
  // We use a ref to track if we've already celebrated this specific "set" of todos
  const hasCelebrated = useRef(false);

  useEffect(() => {
    const total = todos.length;
    const allDone = total > 0 && todos.every((t) => t.isChecked);

    if (allDone && !hasCelebrated.current) {
      fireSuccessConfetti();
      hasCelebrated.current = true; // Mark as done
    }

    // If they add a new task, "reset" so they can celebrate again when they finish it
    if (!allDone && total > 0) {
      hasCelebrated.current = false;
    }
  }, [todos]);
};
