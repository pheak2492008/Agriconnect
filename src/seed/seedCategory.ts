import mongoose from "mongoose";
import dotenv from "dotenv";
import CategoryModel from "../model/categoryModel";

dotenv.config();

const seedCategory = async () => {
  try {
    const urlDb = process.env.MONGODB_URI;
    if (!urlDb) {
      return console.error("MONGODB_URI not set in .env");
    }

    await mongoose.connect(urlDb);
    console.log("MongoDB connected for seeding categories");
    const categories = [
      { name: "Fruits", description: "Fresh and organic fruits" },
      { name: "Vegetables", description: "Healthy and green vegetables" },
  ];
    for (const categoryData of categories) {
      const exists = await CategoryModel.findOne({ name: categoryData.name });
      if (!exists) {
        await CategoryModel.create(categoryData);
        console.log(`Category ${categoryData.name} created`);
      }
    }
  } catch (error) {
    console.error("Error seeding categories:", error);
  }
};
seedCategory();