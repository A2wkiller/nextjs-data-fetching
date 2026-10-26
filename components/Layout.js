import Link from "next/link";
import { useRouter } from "next/router";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function Layout({ children }) {
  const router = useRouter();

  const isActive = (href) =>
    href === "/" ? router.pathname === "/" : router.pathname.startsWith(href);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-slate-900 text-white shadow">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 px-4 py-4">
          <Link href="/" className="text-xl font-bold tracking-tight">
            DataFetchApp
          </Link>
          <nav className="flex flex-wrap justify-center gap-1 sm:gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  isActive(link.href)
                    ? "px-2 sm:px-3 py-1 rounded font-semibold text-amber-400 border-b-2 border-amber-400"
                    : "px-2 sm:px-3 py-1 rounded text-slate-200 hover:text-white hover:bg-slate-700"
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-10">
        {children}
      </main>

      <footer className="bg-slate-100 text-center text-slate-600 py-4 text-sm">
        &copy; {new Date().getFullYear()} DataFetchApp. All rights reserved.
      </footer>
    </div>
  );
}
