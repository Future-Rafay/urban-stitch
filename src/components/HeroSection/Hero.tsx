"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Frown } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "../ui/button";
import { fetchHeroImages, HeroImage } from "@/services/heroImage";

const Hero = () => {
  const [images, setImages] = useState<HeroImage[]>([]); // State for an array of HeroImage
  const [currentIndex, setCurrentIndex] = useState(0);   // Index for carousel navigation
  const [error, setError] = useState<string | null>(null);  // Error state for error handling

  useEffect(() => {
    const loadImages = async () => {
      try {
        const fetchedImages = await fetchHeroImages(); // Fetch data
        setImages(fetchedImages); // Update state with fetched images
        setError(null); // Reset error state on successful fetch
      } catch (error) {
        setError("Sorry, something went wrong while loading the images.");
        console.error("Error fetching hero images:", error);
      }
    };
    loadImages();
  }, []);

  // Automatically change image every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 2000); // 2 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [images.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (error) {
    return (
      <div className="h-auto lg:h-[600px] flex items-center justify-center text-muted-foreground flex-col space-y-2">
        <Frown size={48} className="text-primary mb-4" /> {/* Sad face icon */}
        <p className="text-lg text-muted-foreground">{error}</p>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="h-[600px] flex items-center justify-center text-muted-foreground relative">
        <motion.div
          className="absolute"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center space-x-6">
            <div className="animate-spin rounded-full h-8 w-8 border-y-4 border-accent"></div>
            <p className="text-lg text-muted-foreground">Loading ...</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[600px] overflow-hidden bg-background shadow-md">
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <motion.div
            key={image._id}
            className={`absolute inset-0`}
            initial={{ x: "100%" }} // Start from the right for the new image
            animate={{
              x: index === currentIndex ? 0 : index < currentIndex ? "-100%" : "100%", // Slide image in or out
            }}
            exit={{ x: "-100%" }} // Slide out to the left for the current image
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 3,
            }}
          >
            <Image  
              src={urlFor(image.image.asset.url).url()}
              alt={image.title || `Hero Image ${index + 1}`}
              width={1500}
              height={600}
              className=" object-contain lg:object-cover w-full h-full"
            />
          </motion.div>
        ))}
      </div>

      <Button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-muted p-2 rounded-full shadow hover:bg-muted-foreground transition"
      >
        <ChevronLeft size={24} className="text-white" />
      </Button>
      <Button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-muted p-2 rounded-full shadow hover:bg-muted-foreground transition"
      >
        <ChevronRight size={24} className="text-white" />
      </Button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <Button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${currentIndex === index ? "bg-primary" : "bg-muted"}`}
          ></Button>
        ))}
      </div>
    </div>
  );
};

export default Hero;
