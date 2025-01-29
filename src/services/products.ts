import { client } from "@/sanity/lib/client";
import { FullProductInterface } from "@/types/FullProduct";
import { ProductCardInterFace } from "@/types/ProductCard";

export async function getAllProducts(): Promise<ProductCardInterFace[]> {
    const query = `*[_type == "products"]`;
    const products: ProductCardInterFace[] = await client.fetch(query);
    return products || [];
  }
  
  // Fetch product by ID
  export async function getProductById(productId: string): Promise<FullProductInterface | null> {
    const query = `*[_type == "products" && _id == $productId][0]`;
    const product: FullProductInterface | null = await client.fetch(query, { productId });
    return product;
  }
  
  // Fetch new arrivals
  export async function getNewArrivals(): Promise<ProductCardInterFace[]> {
    const query = `*[_type == "products" && isNew == true] | order(_createdAt desc)[0...4]`;
    const newArrivals: ProductCardInterFace[] = await client.fetch(query);
    return newArrivals || [];
  }
  
  // Fetch related products (based on category)
  export async function getRelatedProducts(category: string): Promise<ProductCardInterFace[]> {
    const query = `*[_type == "products" && category == $category] | order(_createdAt desc)`;
    const relatedProducts: ProductCardInterFace[] = await client.fetch(query, { category });
    return relatedProducts || [];
  }