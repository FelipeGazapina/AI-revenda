"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { UserButton } from "@/components/UserButton";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-background border-b">
        <div className="container mx-auto flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold">
            SaaS Product Manager
          </Link>
          <nav className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  Dashboard <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link
                    href="/dashboard"
                    className={isActive("/dashboard") ? "bg-accent" : ""}
                  >
                    User Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/admin/dashboard"
                    className={isActive("/admin/dashboard") ? "bg-accent" : ""}
                  >
                    Admin Dashboard
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  Products <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link
                    href="/products"
                    className={isActive("/products") ? "bg-accent" : ""}
                  >
                    Browse Products
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/admin/products"
                    className={isActive("/admin/products") ? "bg-accent" : ""}
                  >
                    Manage Products
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/admin/dashboard/product/add"
                    className={
                      isActive("/admin/dashboard/product/add")
                        ? "bg-accent"
                        : ""
                    }
                  >
                    Create Product
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  Users <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link
                    href="/admin/users"
                    className={isActive("/admin/users") ? "bg-accent" : ""}
                  >
                    Manage Users
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/admin/invitations"
                    className={
                      isActive("/admin/invitations") ? "bg-accent" : ""
                    }
                  >
                    Manage Invitations
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/cart">
              <Button
                variant="ghost"
                className={isActive("/cart") ? "bg-accent" : ""}
              >
                Cart
              </Button>
            </Link>
            <UserButton />
          </nav>
        </div>
      </header>
      <div className="flex-1 container py-6">{children}</div>
    </div>
  );
}
