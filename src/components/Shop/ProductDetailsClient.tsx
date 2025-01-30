"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Minus, ShoppingCart, Ruler } from "lucide-react";
import { FullProductInterface } from "@/types/FullProduct";
import { urlFor } from "@/sanity/lib/image";
import RecentlyViewedProducts from "../RecentlyViewedProducts";
import SimilarProducts from "../SimilarProducts";

interface ProductDetailClientProps {
  product: FullProductInterface;
}

const ProductDetailClient: React.FC<ProductDetailClientProps> = ({ product }) => {

  useEffect(() => {
    if (!product) return;

    // Retrieve existing recently viewed products from local storage
    const storedProducts = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");

    // Remove duplicate entries & limit to last 5 items
    const updatedProducts = [
      product,
      ...storedProducts.filter((p: FullProductInterface) => p._id !== product._id),
    ].slice(0, 4);

    // Save back to local storage
    localStorage.setItem("recentlyViewed", JSON.stringify(updatedProducts));
  }, [product]);


  const [selectedSize, setSelectedSize] = React.useState<string>("");
  const [quantity, setQuantity] = React.useState<number>(1);

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto w-11/12 pt-6 md:p-6 space-y-8"
    >
      {/* Product Header */}
      <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto">
        {/* Product Image */}
        <motion.div
          className="relative flex-shrink-0 group mx-auto lg:mx-0"
        >
          {product.isNew && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-0 left-0 bg-accent text-accent-foreground text-xs font-semibold uppercase py-2 px-4 rounded-br-lg z-10"
            >
              New Arrival
            </motion.span>
          )}
          <Image
            src={`${urlFor(product.image).quality(100).url()}`}
            alt={product.name}
            width={1200}
            height={1200}
            className="rounded-lg shadow-md sm:max-w-lg object-contain object-center"
          />
        </motion.div>

        {/* Product Details */}
        <Card className="flex-1 shadow-none border-none   ">
          <CardContent className="p-2 md:p-6 space-y-6">
            <div className="space-y-4">
              <h1 className="text-xl md:text-3xl font-bold text-primary">{product.name}</h1>
              <p className="h-5 w-14 text-secondary-foreground bg-secondary text-sm flex items-center justify-center p-3 rounded-lg">{product.category}</p>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground">{product.description}</p>

              {/* Price Section */}
              <div className="space-y-2">
                <p className="text-xl font-semibold text-accent">
                  ${discountedPrice}
                  {product.discountPercent && (
                    <span className="text-sm text-muted-foreground line-through ml-2">
                      ${product.price.toFixed(1)}
                    </span>
                  )}
                </p>
              </div>

              {/* Colors */}
              {/* <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Colors:</h3>
                <div className="flex gap-2">
                  {product.colors.map((color, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.1 }}
                      className="w-8 h-8 rounded-full border-2 border-muted cursor-pointer"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div> */}

              {/* Sizes */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Ruler className="w-4 h-4" />
                  <span>Sizes:</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size, index) => (
                    <motion.button
                      key={index}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSize(size)}
                      className={`p-2 text-sm rounded-md transition-colors ${selectedSize === size
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted/50 hover:bg-muted"
                        }`}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-muted-foreground">Quantity:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-8 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <motion.div whileHover={{ scale: 1.02 }}>
                <Button className="w-full gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </Button>
              </motion.div>
            </div>
            {/* Metadata */}
            <div className="text-xs text-muted-foreground space-y-1">
              {/* <p>Created At: {new Date(product._createdAt).toLocaleDateString("en-US")}</p> */}
              <p>Last Updated: {new Date(product._updatedAt).toLocaleDateString("en-US")}</p>
            </div>
          </CardContent>
        </Card>

      </div>

      <SimilarProducts category={product.category} />
      <RecentlyViewedProducts />
    </motion.div>
  );
};

export default ProductDetailClient;