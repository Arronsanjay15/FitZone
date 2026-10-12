export const STORAGE_KEYS = {
  completed: "fitzone-completed",
  sets: "fitzone-set-checks",
  history: "fitzone-history",
  favorites: "fitzone-favorites"
} as const;

export function readStorage<T>(key: string, fallback: T): T {
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* Ignore quota / privacy-mode errors — progress simply won't persist. */
  }
}

export function makeId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
