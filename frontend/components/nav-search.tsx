"use client";

import { File, Search } from "lucide-react";
import { useEffect, useState } from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import useDebounce from "@/hooks/use-debounce";
import { searchFiles } from "@/lib/modules/search/search.api";
import { SearchResult } from "@/lib/modules/search/search.schema";

function NavbarSearch() {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState<SearchResult[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const debouncedQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    (async () => {
      if (debouncedQuery) {
        const { data, error } = await searchFiles({
          query: debouncedQuery,
          page: 1,
          page_size: 5,
        });
        if (error || !data) {
          return;
        }
        setResult(data.results);
      }
    })();
  }, [debouncedQuery]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center justify-between gap-1 sm:gap-2 rounded-md bg-muted/30 px-3 py-1.5 hover:bg-muted/50 transition-colors group border border-transparent"
      >
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <span className="w-20 md:w-32 hidden md:block text-left bg-transparent text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
            Type here...
          </span>
        </div>
        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex text-muted-foreground">
          <span className="text-[10px]">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          value={searchQuery}
          onValueChange={(v) => setSearchQuery(v)}
          placeholder="Type a command or search..."
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Files">
            {result.map((item) => (
              <CommandItem
                key={item.item_id}
                value={item.token}
                onSelect={() => setOpen(false)}
              >
                <File className="mr-2 h-4 w-4 text-muted-foreground shrink-0" />
                <span className="truncate">{item.token}</span>
                <span className="ml-auto text-xs text-muted-foreground truncate">
                  {item.item_id}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

export { NavbarSearch };
