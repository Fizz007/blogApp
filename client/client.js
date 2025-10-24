import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Sanity client
export const client = createClient({
  projectId: "mg4c1cx3",
  dataset: "production",
  apiVersion: "2025-10-16",
  useCdn: false,
});

// Image builder helper
const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
