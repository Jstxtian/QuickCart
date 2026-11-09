// Category model
// A Shop department, e.g Electronics, Fashion, Home & Living

import { Schema, model } from "mongoose";
// STEP 7: The Category model
// A model decribes what one record looks like in the database. ICategory is the typeScript type; the schema tells MongoDB the rules (required, unique...)

export interface ICategory {
  name: string;
  slug: string; // used in links, e.g "home-living"
  icon: string; // name of the icon shown on the website
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    icon: { type: String, default: "" },
  },
  { timestamps: true },
);

export const Category = model<ICategory>("Category", categorySchema);
