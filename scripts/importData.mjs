import { createClient } from "@sanity/client";
import axios from "axios";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_TOKEN,
  apiVersion: "2021-08-31",
});

/**
 * Upload image to Sanity.
 * @param {string} imageUrl - URL of the image.
 * @returns {string|null} - Sanity asset reference or null on failure.
 */
async function uploadImageToSanity(imageUrl) {
  try {
    console.log(`Uploading image: ${imageUrl}`);
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data);
    const asset = await client.assets.upload("image", buffer, {
      filename: path.basename(imageUrl),
    });
    console.log(`Image uploaded successfully: ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error(`Failed to upload image: ${imageUrl}`, error.message);
    return null;
  }
}

/**
 * Import product data into Sanity.
 */
async function importData() {
  try {
    console.log("Fetching products from API...");
    const response = await axios.get("https://template1-neon-nu.vercel.app/api/products");
    const products = response.data;

    console.log(`Fetched ${products.length} products`);

    for (const product of products) {
      console.log(`Processing product: ${product.name}`);

      // Declare `imageRef` inside the loop
      let imageRef = null;

      if (product.imageUrl) {
        imageRef = await uploadImageToSanity(product.imageUrl);
      }

      const sanityProduct = {
        _type: "products",
        name: product.name,
        description: product.description,
        price: product.price,
        image: imageRef
          ? {
            _type: "image",
            asset: {
              _ref: imageRef,
            },
          }
          : null,
        category: product.category,
        discountPercent: product.discountPercent || 0,
        isNew: product.isNew || false,
        colors: product.colors || [],
        sizes: product.sizes || [],
      };

      try {
        console.log(`Uploading product to Sanity: ${sanityProduct.name}`);
        const result = await client.create(sanityProduct);
        console.log(`Product uploaded successfully: ${result._id}`);
      } catch (error) {
        console.error(`Failed to upload product: ${sanityProduct.name}`, error.message);
      }
    }

    console.log("Data import completed successfully!");
  } catch (error) {
    console.error("Error fetching or importing products:", error.message);
  }
}

// Execute import
importData();