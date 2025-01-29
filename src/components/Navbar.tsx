"use client";
import { useState } from "react";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";
import { Search, ShoppingCart, User } from "lucide-react";
import { usePathname } from "next/navigation";

const links = [
  { name: "Men", href: "/men" },
  { name: "Women", href: "/women" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="bg-background px-6 sm:px-10 md:px-6 lg:px-16 xl:px-28 h-16 flex items-center justify-between shadow-lg">
      {/* Logo */}
      <Link href="/" className="text-lg md:text-2xl lg:text-3xl font-extrabold flex-shrink-0">
        <div>
          <span className="text-primary">Urban</span>&nbsp;
          <span className="text-accent">Stitch</span>
        </div>
      </Link>

      {/* Desktop Search Bar */}
      <div className="hidden md:flex items-center space-x-2 bg-muted p-2 rounded-lg w-1/3">
        <Search className="text-muted-foreground" size={20} />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none w-full text-sm text-muted-foreground"
        />
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`font-semibold uppercase tracking-wide text-muted-foreground transition-all duration-200 ${pathname === link.href
                  ? "text-primary border-b-2 border-primary"
                  : "hover:text-accent"
                }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Desktop Icons */}
      <div className="hidden md:flex items-center space-x-4">
        <Link href="/cart" aria-label="Cart">
          <ShoppingCart className="text-muted-foreground hover:text-accent transition" size={24} />
        </Link>
        <Link href="/profile" aria-label="Profile">
          <User className="text-muted-foreground hover:text-accent transition" size={24} />
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden text-2xl text-muted-foreground"
      >
        {isMenuOpen ? <HiX /> : <HiMenu />}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-card text-card-foreground flex flex-col items-center space-y-4 py-4 md:hidden shadow-lg border-t border-border">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-semibold uppercase tracking-wide transition-all duration-200 ${pathname === link.href
                  ? "text-primary border-b-2 border-primary"
                  : "hover:text-accent"
                }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {/* Mobile Search Bar */}
          <div className="flex items-center space-x-2 bg-muted p-2 rounded-lg w-11/12 max-w-sm">
            <Search className="text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none w-full text-sm text-muted-foreground"
            />
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/cart" aria-label="Cart">
              <ShoppingCart className="text-muted-foreground hover:text-accent transition" size={24} />
            </Link>
            <Link href="/profile" aria-label="Profile">
              <User className="text-muted-foreground hover:text-accent transition" size={24} />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
