"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

import { Button } from "@/components/ui/button";

type ThemeToggleProps = {
  showText?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & Omit<React.ComponentPropsWithoutRef<"button">, "onClick"> &
  Omit<React.ComponentPropsWithoutRef<"div">, "onClick">;

export const ThemeToggle = React.forwardRef<
  HTMLButtonElement | HTMLDivElement,
  ThemeToggleProps
>(({ showText, className, onClick, ...props }, ref) => {
  const { theme, setTheme } = useTheme();

  const handleToggle = (e: React.MouseEvent<HTMLElement>) => {
    setTheme(theme === "dark" ? "light" : "dark");
    if (onClick) onClick(e);
  };

  if (showText) {
    return (
      <div
        ref={ref as React.ForwardedRef<HTMLDivElement>}
        onClick={handleToggle}
        className={`flex items-center w-full ${className || ""}`}
        {...props}
      >
        {theme === "dark" ? (
          <Sun className="mr-2 h-4 w-4" />
        ) : (
          <Moon className="mr-2 h-4 w-4" />
        )}
        <span>Toggle Theme</span>
      </div>
    );
  }

  return (
    <Button
      ref={ref as React.ForwardedRef<HTMLButtonElement>}
      variant="outline"
      size="icon"
      onClick={handleToggle}
      className={className}
      {...props}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
});
ThemeToggle.displayName = "ThemeToggle";
