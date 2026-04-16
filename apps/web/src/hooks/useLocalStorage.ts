import { useEffect, useState } from "react";

export function useLocalStorage(key: string, initialValue: string) {
  const [value, setValue] = useState<string>(() => {
    const cached = window.localStorage.getItem(key);
    return cached ?? initialValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue] as const;
}
