/**
 * Whether the page currently on screen has a hero carrying the big
 * TAMA / MYKONOS wordmark. Only that page hides the small wordmark in the
 * bar until you scroll — elsewhere there is nothing for it to hand over to.
 */
import { useSyncExternalStore } from "react";

let present = false;
const listeners = new Set<() => void>();

export function setHeroWordmark(value: boolean) {
  if (present === value) return;
  present = value;
  listeners.forEach((l) => l());
}

export function useHeroWordmark() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => present,
    () => false,
  );
}
