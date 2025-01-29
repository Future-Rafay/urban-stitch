import { defineType } from "sanity";

export default defineType({
  name: "products",
  title: "Products",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "price",
      title: "Price",
      type: "number",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "T-Shirt", value: "tshirt" },
          { title: "Short", value: "short" },
          { title: "Jeans", value: "jeans" },
          { title: "Hoodie", value: "hoodie" },
          { title: "Shirt", value: "shirt" },
        ],
      },
    },
    {
      name: "discountPercent",
      title: "Discount Percent",
      type: "number",
    },
    {
      name: "isNew",
      title: "Is New",
      type: "boolean",
    },
    {
      name: "colors",
      title: "Colors",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "sizes",
      title: "Sizes",
      type: "array",
      of: [{ type: "string" }],
    },
  ],
});