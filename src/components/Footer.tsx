"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaFacebookSquare } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";

export default function Footer() {
    return (
        <footer className="bg-primary text-primary-foreground shadow-lg mt-8 py-12 border-t-4 border-accent">
            <div className="container mx-auto px-6 lg:px-12">
                {/* Brand Section */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold">Urban Stitch</h1>
                    <p className="text-muted-foreground text-lg mt-4 max-w-3xl mx-auto">
                        Discover premium quality fashion tailored to your style.
                    </p>
                </div>

                {/* Information Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-start">
                    <div>
                        <h3 className="font-semibold text-accent mb-3">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link href="/" className="hover:text-accent transition">Home</Link></li>
                            <li><Link href="/products" className="hover:text-accent transition">Products</Link></li>
                            <li><Link href="/about" className="hover:text-accent transition">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-accent transition">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-accent mb-3">Customer Service</h3>
                        <ul className="space-y-2">
                            <li><Link href="/privacy-policy" className="hover:text-accent transition">Privacy Policy</Link></li>
                            <li><Link href="/refund-policy" className="hover:text-accent transition">Refund & Cancellation</Link></li>
                            <li><Link href="/return-policy" className="hover:text-accent transition">Returns & Exchange</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-accent mb-3">Newsletter</h3>
                        <p className="text-muted-foreground text-sm mb-4">
                            Subscribe to stay updated on our latest products and offers.
                        </p>
                        <div className="flex flex-col space-y-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="p-2 border border-muted bg-background text-primary rounded-md focus:outline-accent"
                            />
                            <Button className="bg-accent text-accent-foreground hover:bg-secondary hover:text-secondary-foreground">Subscribe</Button>
                        </div>
                    </div>
                </div>

                {/* Social Media Icons */}
                <div className="flex justify-center gap-6 mt-12 text-2xl">
                    <Link href="https://facebook.com" className="hover:text-accent transition">
                        <FaFacebookSquare />
                    </Link>
                    <Link href="https://instagram.com" className="hover:text-accent transition">
                        <FiInstagram />
                    </Link>
                </div>
            </div>
        </footer>
    );
}
