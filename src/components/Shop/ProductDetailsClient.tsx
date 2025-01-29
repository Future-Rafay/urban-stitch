import React from "react";
 // Adjust the import path as needed
import Image from "next/image"; // For optimized images
import { FullProductInterface } from "@/types/FullProduct";
import { urlFor } from "@/sanity/lib/image";

interface ProductDetailClientProps {
  product: FullProductInterface;
}

const ProductDetailClient: React.FC<ProductDetailClientProps> = ({ product }) => {

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-muted-foreground">Product not found.</p>
      </div>
    );
  }

  const discountedPrice = product.discountPercent
    ? (product.price - (product.price * product.discountPercent) / 100).toFixed(2)
    : product.price.toFixed(2);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Product Header */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <Image
            src={`${urlFor(product.image.asset._ref).url()}`} // Adjust this path if needed
            alt={product.name}
            width={4000}
            height={4000}
            className="rounded-lg shadow-md w-[400px]"
          />
          {product.isNew && (
            <span className="mt-2 inline-block bg-green-500 text-white text-xs font-semibold uppercase py-1 px-2 rounded-full">
              New
            </span>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between space-y-4">
          <h1 className="text-3xl font-bold text-primary">{product.name}</h1>
          <p className="text-secondary text-sm">Category: {product.category}</p>
          <p className="text-muted-foreground">{product.description}</p>
          <div className="space-y-2">
            <p className="text-xl font-semibold text-accent">
              ${discountedPrice}
              {product.discountPercent && (
                <span className="text-sm text-muted-foreground line-through ml-2">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </p>
          </div>

          {/* Colors */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Colors:</h3>
            <div className="flex gap-2">
              {product.colors.map((color, index) => (
                <div
                  key={index}
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Sizes:</h3>
            <div className="flex gap-2">
              {product.sizes.map((size, index) => (
                <span
                  key={index}
                  className="px-3 py-1 border rounded-lg text-sm text-muted-foreground"
                >
                  {size}
                </span>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button className="px-6 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary-dark transition">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Metadata */}
      <div className="text-xs text-muted-foreground">
        <p>Created At: {new Date(product._createdAt).toLocaleDateString()}</p>
        <p>Last Updated: {new Date(product._updatedAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default ProductDetailClient;
