"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";
import { Search, ShoppingCart, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { ProductCardInterFace } from "@/types/ProductCard";
import { getAllProducts } from "@/services/products";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Logo from "./Logo";


const links = [
  { name: "Men", href: "/men" },
  { name: "Women", href: "/women" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<ProductCardInterFace[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductCardInterFace[]>([]);
  const pathname = usePathname();

  // Fetch products from Sanity
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Handle search input changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredProducts([]);
      return;
    }

    const lowerQuery = searchQuery.toLowerCase();
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery) ||
      product.description?.toLowerCase().includes(lowerQuery)
    );

    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  // Clear search results
  const clearSearch = () => {
    setSearchQuery("");
    setFilteredProducts([]);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="bg-background px-6 sm:px-10 md:px-6 lg:px-16 xl:px-28 h-20 flex items-center justify-between shadow-lg">
      {/* Logo */}

      <Link href="/" className="mb-2"><Logo /></Link>


      <div className="hidden md:flex items-center space-x-3 bg-muted px-4 py-2 rounded-xl w-1/3 relative shadow-md transition-all">
        <Search className="text-muted-foreground" size={20} />

        <input
          type="text"
          placeholder="Search products..."
          className="bg-transparent outline-none w-full text-sm text-muted-foreground placeholder:text-gray-400 focus:ring-0"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Search Results Dropdown */}
        {filteredProducts.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-xl shadow-xl z-50 max-h-72 overflow-y-auto">
            {filteredProducts.map((product) => (
              <Link
                key={product._id}
                href={`/shop/${product._id}`}
                className="flex items-center gap-3 p-3 hover:bg-muted transition-all rounded-lg cursor-pointer"
                onClick={clearSearch}
              >
                <Image
                  src={urlFor(product.image).url()}
                  alt={product.name}
                  width={45}
                  height={45}
                  className="rounded-md object-contain w-[45px] h-[45px]"
                />
                <div className="flex flex-col">
                  <h4 className="text-sm font-medium text-primary">{product.name}</h4>
                  <p className="text-xs text-muted-foreground">{product.category}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Navigation */}
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
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <HiX /> : <HiMenu />}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed md:hidden inset-0 z-50 bg-black/50" onClick={() => setIsMenuOpen(false)}>
          <div className="absolute top-16 left-0 right-0 bg-card text-card-foreground flex flex-col items-center space-y-4 py-4 shadow-lg border-t border-border" onClick={(e) => e.stopPropagation()}>
            {/* Mobile Search */}
            <div className="w-11/12 max-w-sm relative">
              <div className="flex items-center space-x-2 bg-muted p-2 rounded-lg">
                <Search className="text-muted-foreground" size={20} />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="bg-transparent outline-none w-full text-sm text-muted-foreground"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Mobile Search Results */}
              {filteredProducts.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-xl shadow-xl z-50 max-h-72 overflow-y-auto">
                  {filteredProducts.map((product) => (
                    <Link
                      key={product._id}
                      href={`/shop/${product._id}`}
                      className="flex items-center gap-3 p-3 hover:bg-muted transition-all rounded-lg cursor-pointer"
                      onClick={clearSearch}
                    >
                      <Image
                        src={urlFor(product.image).url()}
                        alt={product.name}
                        width={45}
                        height={45}
                        className="rounded-md object-contain w-[45px] h-[45px]"
                      />
                      <div className="flex flex-col">
                        <h4 className="text-sm font-medium text-primary">{product.name}</h4>
                        <p className="text-xs text-gray-500">{product.category}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Navigation Links */}
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`w-11/12 text-center py-2 font-semibold uppercase tracking-wide ${pathname === link.href
                  ? "text-primary border-b-2 border-primary"
                  : "hover:text-accent"
                  }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Icons */}
            <div className="flex items-center space-x-6 pt-4">
              <Link href="/cart" aria-label="Cart">
                <ShoppingCart className="text-muted-foreground hover:text-accent transition" size={24} />
              </Link>
              <Link href="/profile" aria-label="Profile">
                <User className="text-muted-foreground hover:text-accent transition" size={24} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}