"use client";

import { LogOut, Settings } from "lucide-react";
import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserFullInfo } from "@/lib/modules/user/user.types";

export const NavUser = ({ user }: { user: UserFullInfo | null }) => {
  return (
    <div className="flex items-center gap-3 rounded-xl border bg-background/80 p-2 backdrop-blur">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
        {user?.name?.charAt(0).toUpperCase() || "U"}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <p className="truncate text-sm font-medium">{user?.name || "Guest"}</p>
        <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <ThemeToggle showText className="cursor-pointer" />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link
              href="#"
              className="cursor-pointer text-red-600 focus:text-red-600"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
