import "./globals.css";
import { UserButton } from "@/components/UserButton";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <main className="flex-1 container mx-auto">{children}</main>
      </body>
    </html>
  );
}
