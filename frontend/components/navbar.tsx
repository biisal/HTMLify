"use client";

import { ArrowRight, Menu, Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { env } from "@/lib/env";

const NAV_LINKS = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Temp Share", href: "/tmp" },
  { name: "Shortlinks", href: "/r" },
  { name: "Frames", href: "/frames" },
  { name: "API", href: "/api" },
];

const NAV_SEARCH_LINKS = NAV_LINKS.concat(
  { name: "Upload Files", href: "/dashboard/file/upload" },
  { name: "Add New File", href: "/dashboard/file/new" },
  { name: "Git Clone", href: "/dashboard/file/git-clone" },
  { name: "Temporary File", href: "/dashboard/tmp" },
);
function NavbarSearch() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

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
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Links">
            {NAV_SEARCH_LINKS.map((link) => (
              <CommandItem
                key={link.href}
                value={link.name}
                onSelect={() => {
                  router.push(link.href);
                  setOpen(false);
                }}
              >
                <span>{link.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

export function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="backdrop-blur-3xl fixed top-0 w-full z-50 py-4 px-8 bg-foreground/5 text-foreground">
      <div className="container mx-auto w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Logo />
          <span className="text-lg font-bold tracking-tight text-foreground">
            {env.NEXT_PUBLIC_SITE_NAME}
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-6 rounded-md bg-muted/40 px-6 py-2.5">
          {NAV_LINKS.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-foreground ${
                link.href === pathname
                  ? "text-foreground hover:opacity-80"
                  : "text-muted-foreground"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <NavbarSearch />
          <div className="lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 border-none outline-none"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-52 flex flex-col gap-1 p-2"
              >
                {NAV_LINKS.map((link, index) => (
                  <DropdownMenuItem key={index} asChild>
                    <Link
                      href={link.href}
                      className={`cursor-pointer font-medium ${
                        index === 0
                          ? ""
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
