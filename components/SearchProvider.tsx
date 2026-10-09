"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import CommandPalette, { type SearchItem } from "@/components/CommandPalette";

type SearchContextValue = { openSearch: () => void; closeSearch: () => void };

const SearchContext = createContext<SearchContextValue>({
  openSearch: () => {},
  closeSearch: () => {},
});

export const useSearch = () => useContext(SearchContext);

export default function SearchProvider({
  children,
  items,
}: {
  children: ReactNode;
  items: SearchItem[];
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, []);

  return (
    <SearchContext.Provider
      value={{
        openSearch: () => setOpen(true),
        closeSearch: () => setOpen(false),
      }}
    >
      <CommandPalette open={open} close={() => setOpen(false)} items={items} />
      {children}
    </SearchContext.Provider>
  );
}
