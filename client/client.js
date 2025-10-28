import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Sanity client
export const client = createClient({
  projectId: "mg4c1cx3",
  dataset: "production",
  apiVersion: "2025-10-16",
  token:"skJxBVOCkgTbMki88kRPHVaLL63ryslbRq740vtguwb6ELEEmEtk2fvkCJYIM07AbEMqidjDu6uumsqfshTUcmsPRO5kwpa5SJ7NQ0olyOBwnFjM8wI6w3iJ1k8Ds43FGgYWONmOd2RMON3bpysACzLcoqRlvw6p4LbfzdXCy5xfcEegi53Q",
  useCdn: false,
});

// Image builder helper
const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
