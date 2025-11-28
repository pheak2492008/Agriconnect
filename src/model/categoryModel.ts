import mongoose, { Schema, model } from "mongoose";
import { CategoryType } from "../types/categoryType";

const categorySchema = new Schema<CategoryType>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const CategoryModel = model<CategoryType>("Category", categorySchema);

export default CategoryModel;