"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { Logo } from "@/components/logo";
import { NavbarSearch } from "@/components/nav-search";
import { Button } from "@/components/ui/button";
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
