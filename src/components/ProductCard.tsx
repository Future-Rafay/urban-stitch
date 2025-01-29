import React from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { ProductCardInterFace } from "@/types/ProductCard";

interface ProductCardProps {
    product: ProductCardInterFace;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const {
        _id,
        name,
        price,
        discountPercent,
        image,
        category,
    } = product;

    const discountedPrice = discountPercent
        ? (price * (100 - discountPercent)) / 100
        : price;

    return (
        <div className="">
            <div
                key={_id}
                className="max-w-sm mx-auto group flex flex-col rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-transform transform hover:-translate-y-1"
            >
                {/* Product Image */}
                <div className="relative w-full h-64 bg-gray-100">
                    <Link href={`/shop/${_id}`}>
                        <Image
                            src={image?.asset?._ref ? urlFor(image.asset._ref).url() : "/images/notFound.png"}
                            alt={name || "Product Image"}
                        
                            layout="fill"
                            objectFit="contain"
                            className=" aspect-square transition-opacity group-hover:opacity-90"
                        />
                    </Link>


                </div>

                {/* Product Details */}
                <div className="flex flex-col gap-2 p-4">
                    <Link href={`/product/${_id}`}>
                        <h3 className="text-lg font-semibold text-primary truncate">
                            {name || "Unknown Product"}
                        </h3>
                    </Link>
                    <span className="w-14 bg-secondary text-muted-foreground text-sm font-semibold px-2 py-1 rounded-full flex items-center justify-center">
                        {category}
                    </span>

                    {/* Price Display */}
                    <div className="flex items-center gap-2 text-lg font-semibold">
                        {discountPercent ? (
                            <>
                                <span className="line-through text-muted-foreground">${price.toFixed(2)}</span>
                                <span className="text-primary">${discountedPrice.toFixed(2)}</span>
                            </>
                        ) : (
                            <span className="text-primary">${price.toFixed(2)}</span>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductCard;

