"use client"; // This is for client-side rendering in Next.js

import React from "react";
import { HiArrowRight } from "react-icons/hi"; // Icon for the button
import { Button } from "../ui/button"; // Ensure you have this button component
import Image from "next/image";
import Link from "next/link";

const Hero1 = () => {
    return (
        <section className="relative bg-background text-foreground sm:py-12 md:py-16 ">
            {/* Background Image */}
            <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('/images/hero/bg.png')" }} />

            {/* Hero Content */}
            <div className="relative container mx-auto md:px-12 flex flex-col-reverse md:flex-row items-center justify-between">
                {/* Left Section */}
                <div className="flex flex-col items-start w-full md:w-[45%] text-center md:text-left order-2 md:order-1 py-12 sm:py-16 md:py-20 px-6 md:px-0">

                    <h2 className="text-2xl sm:text-4xl md:text-6xl font-extrabold text-primary">
                        Elevate Your Lifestyle with Urban Stitch Cloths
                    </h2>
                    <h3 className="my-6 text-lg sm:text-2xl md:text-3xl text-muted-foreground">
                        Your one-stop destination for the finest goods.
                    </h3>
                    <Link href='/shop'>
                        <Button
                            className="h-12 w-64 text-lg font-semibold"
                        >
                            <span>Shop Now</span>
                            <HiArrowRight size={20} />
                        </Button>
                    </Link>
                </div>

                {/* Right Section */}
                <div className="relative w-full md:w-[45%] flex justify-center items-center mt-12 md:mt-0 overflow-auto order-1 md:order-2 ">
                    <Image
                        className="h-[500px] sm:h-[700px] object-contain overflow-auto"
                        height={1000}
                        width={2000}
                        src="/images/hero/image2.png"
                        alt="hero image"
                        priority
                    />
                    <Image
                        className="h-[500px] sm:h-[700px]  object-contain overflow-auto"
                        height={1000}
                        width={1000}
                        src="/images/hero/image1.png"
                        alt="hero2 image"
                        priority
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero1;

