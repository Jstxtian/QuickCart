// seed.ts
// fills the database withe the demo data: npm run seed
// Running it again wipes the demo collections and starts fresh, so its always safe to re-run

import mongoose, { Types } from "mongoose";
import { Category } from "../models/Category";
import { Product } from "../models/Products";
import { demoCategories, demoProducts, demoUsers } from "./demoData";
import { listProductPhotoId } from "../config/cloudinary";
import { products } from "./products";
import { categories } from "./categories";
import { connectDB } from "../config/database";
import { User } from "../models/User";

// STEP 13: The seed command
// seedDatabase( does the work and is exported, so the demo panel can reuse it.
// The bottom of the file runs it only when you type npm run seed.

export const seedDatabase = async () => {
  // 1. Empty the collections (both at the same time with promise.all)
  await Promise.all([
    Category.deleteMany({}),
    Product.deleteMany({}),
    User.deleteMany({}),
  ]);

  // 2. Save the categories, the remember each ones id by slug: "electronics" -> ObjectId(....)
  const savedCategories = await Category.insertMany(demoCategories());
  const categoryIds = new Map<string, Types.ObjectId>(
    savedCategories.map((category) => {
      return [category.slug, category._id];
    }),
  );

  //   3, which photos are on cloudinary?
  const photosIds = await listProductPhotoId();

  //   4. Save the products
  const saveProducts = await Product.insertMany(
    demoProducts(categoryIds, photosIds),
  );

  //   5. Link bundles and related products. product.ts uses names; we swap each name for it's id.
  const ProductIds = new Map<string, Types.ObjectId>(
    saveProducts.map((product) => {
      return [product.name, product._id];
    }),
  );

  //   ["Gold-plates 3.5mm AUX Cable",...] -> [)bjectId(...), ...]
  // A misspelt name stops the seed with a clear message instead of silently dropping the link.
  const idsFor = (names: string[] | undefined, owner: string) => {
    return (names ?? []).map((name) => {
      const id = ProductIds.get(name);

      if (!id) {
        throw new Error(
          `"${owner}" links to a product that doesnt exist: "${name}"`,
        );
      }

      return id;
    });
  };

  //   bulkwrite sends all 40 opdates to mongoDb in one trip instead of 40 seperate saves
  await Product.bulkWrite(
    products.map((item) => {
      return {
        updateOne: {
          filter: { _id: ProductIds.get(item.name) },
          update: {
            $set: {
              bundleProducts: idsFor(item.bundle, item.name),
              relatedProducts: idsFor(item.related, item.name),
            },
          },
        },
      };
    }),
  );

  // 6. Save the demo users. User.create (NOT insertMany): only create/save runs the model's
  // pre("save") hook, which hashes the passwords. insertMany would store them as plain text!
  const savedUsers = await User.create(demoUsers());

  //   7. A summary for whoever ran the seed
  return {
    users: savedUsers.length,
    categories: savedCategories.length,
    products: saveProducts.length,
    withoutPhotos: saveProducts
      .filter((product) => {
        return product.images.length === 0;
      })
      .map((product) => {
        return product.name;
      }),
  };
};

// Runs when you type "npm run seed": connect, seed, report, disconnected
const runSeed = async () => {
  try {
    await connectDB();
    const result = await seedDatabase();

    console.log(
      `Seeded ${result.categories} categories and ${result.products} products and ${result.users} users`,
    );
    if (result.withoutPhotos.length > 0) {
      console.log(
        "These Products have no photos:",
        result.withoutPhotos.join(","),
      );
    }
  } catch (error) {
    console.log("Send Failed:", (error as Error).message);
    process.exitCode = 1; // tells the terminal it failed, without cutting off the disconnect below
  } finally {
    await mongoose.disconnect(); // without this the command would hand and never finish
  }
};

// requir.main === module" is true only when this file is run directly (npm run seed).
// not when another file imports seeDatabase(the demo panel). so importing never re-seeds by accident.

if (require.main === module) {
  runSeed();
}
