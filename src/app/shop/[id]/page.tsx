import ProductDetailClient from "@/components/Shop/ProductDetailsClient";
import { getProductById } from "@/services/products";
import { FullProductInterface } from "@/types/FullProduct";

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product: FullProductInterface | null = await getProductById(params.id);

  // Handle the case where the product is null
  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-muted-foreground">Product not found.</p>
      </div>
    );
  }

  return <ProductDetailClient product={product} />;
}
