"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getNewArrivals } from "@/services/products";
import { ProductCardInterFace } from "@/types/ProductCard";
import { Skeleton } from "../ui/skeleton";
import ProductCard from "../ProductCard";
import { Frown } from "lucide-react";

const NewArrival = () => {
  const [products, setProducts] = useState<ProductCardInterFace[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data: ProductCardInterFace[] = await getNewArrivals();
        setProducts(data);
        setError(false); // Reset error state on successful fetch
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(true); // Set error state if fetching fails
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-background text-foreground max-w-[1280px] mx-auto h-auto my-[72px]">
      <h2 className="text-2xl sm:text-4xl md:text-6xl font-extrabold text-primary text-center mb-20">
        New <span className="text-accent">Arrivals</span>
      </h2>
      {error ? (
        <div className="text-muted-foreground text-center">
          <Frown size={48} className="text-primary mb-4 mx-auto " />
          Oops! Something went wrong. Please try again later.
        </div>
      ) : (
        <div className="flex overflow-auto gap-6">
          {products.length === 0 ? (
            // Show skeleton loaders if products are loading
            Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={index}
                className="w-full h-[300px] rounded-lg animate-pulse"
              />
            ))
          ) : (
            products.map((product) => <ProductCard key={product._id} product={product} />)
          )}
        </div>
      )}
      <button className="w-[218px] h-[52px] rounded-[62px] border border-[rgba(0,0,0,0.3)] text-[16px] font-medium flex items-center justify-center mt-[36px] mx-auto hover:text-secondary hover:bg-primary bg-secondary text-primary transition-all duration-300 ease-linear">
        <Link href="/shop">View All</Link>
      </button>
    </div>
  );
};

export default NewArrival;
