// categories.ts
//  the 8 shop departments from the Home page. "icon" is the material icon name the website shows.
//  STEP 10: Write the demo data/API
// The demo data lives in plain TypeScript file: catgeories here, products, reviews, promo codes and users next to it. Edit them to change the shop's content.

export const categories = [
  { name: "Electronics", slug: "electronics", icon: "devices" },
  { name: "Fashion", slug: "fashion", icon: "checkroom" },
  { name: "Home & Living", slug: "home-living", icon: "chair" },
  { name: "Beauty", slug: "beauty", icon: "spa" },
  { name: "Sports", slug: "sports", icon: "fitness-center" },
  { name: "Books", slug: "books", icon: "menu-book" },
  { name: "Office", slug: "office", icon: "desk" },
  { name: "Kitchen", slug: "kitchen", icon: "soup_kitchen" },
];

// part of STEP 10 is to develop the products API -> server/src/data/products.ts
// STEP 11: Put the demo data in the db-> server/src/data/demoData.ts
