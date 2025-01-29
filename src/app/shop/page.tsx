"use client";

import React, { useEffect, useState } from "react";
import { getAllProducts } from "@/services/products";
import ProductCard from "@/components/ProductCard";
import { ProductCardInterFace } from "@/types/ProductCard";

const ProductListPage = () => {
  const [products, setProducts] = useState<ProductCardInterFace[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const fetchedProducts = await getAllProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading products...</div>;
  }

  if (products.length === 0) {
    return <div className="flex justify-center items-center h-screen">No products available.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-primary mb-8">Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;
