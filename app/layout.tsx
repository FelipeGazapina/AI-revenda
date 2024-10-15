import { UserButton } from "@/components/UserButton";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <div className="flex flex-col min-h-screen">
          <header className="bg-background border-b">
            <div className="container flex items-center justify-between h-16">
              <Link href="/" className="text-2xl font-bold">
                SaaS Product Manager
              </Link>
              <nav className="flex items-center space-x-4">
                <Link href="/dashboard" className="text-sm font-medium">
                  Dashboard
                </Link>
                <Link href="/products" className="text-sm font-medium">
                  Products
                </Link>
                <Link href="/cart" className="text-sm font-medium">
                  Cart
                </Link>
                <UserButton />
              </nav>
            </div>
          </header>
          <main className="flex-1 container py-6">{children}</main>
          <footer className="bg-background border-t">
            <div className="container flex items-center justify-center h-16">
              <p className="text-sm text-muted-foreground">
                © 2023 SaaS Product Manager. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
