"use client";

import { useEffect, useState } from "react";
import { Frown } from "lucide-react";
import { FullProductInterface } from "@/types/FullProduct";
import { Skeleton } from "./ui/skeleton";
import ProductCard from "./ProductCard";


const RecentlyViewedProducts = () => {
    const [recentProducts, setRecentProducts] = useState<FullProductInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        try {
            const storedProducts = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
            setRecentProducts(storedProducts);
        } catch (err) {
            console.error("Error fetching recently viewed products:", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    }, []);

    if (error) {
        return (
            <div className="text-muted-foreground text-center my-12">
                <Frown size={48} className="text-primary mb-4 mx-auto" />
                Oops! Something went wrong. Please try again later.
            </div>
        );
    }

    if (recentProducts.length === 0 && !loading) return null;

    return (
        <div className="bg-background text-foreground max-w-[1280px] mx-auto my-20">
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-extrabold text-primary text-center mb-12">
                Recently <span className="text-accent">Viewed</span>
            </h2>

            <div className="flex overflow-auto gap-6">
                {loading
                    ? Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton key={index} className="w-full h-[300px] rounded-lg animate-pulse" />
                    ))
                    : recentProducts.map((product) => <ProductCard key={product._id} product={product} />)}
            </div>

        </div>
    );
};

export default RecentlyViewedProducts;
