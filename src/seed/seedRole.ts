import mongoose from "mongoose";
import { roleModel } from "../model/roleModel";
import dotenv from "dotenv";

dotenv.config();

const seeRole = async () => {
  try {
    const urlDb = process.env.MONGODB_URI;
    if (!urlDb) {
      return console.error("MONGODB_URI not set in .env");
    }

    await mongoose.connect(urlDb);
    console.log("MongoDB connected for seeding roles");
    const roles = [
      { name: "customer", description: "Customer role with limited access" },
      {
        name: "farmer",
        description: "Farmer role with product management access",
      },
    ];
    for (const roleData of roles) {
      const exists = await roleModel.findOne({ name: roleData.name });
      if (!exists) {
        await roleModel.create(roleData);
        console.log(`Role ${roleData.name} created`);
      }
    }
  } catch (error) {
    console.error("Error seeding roles:", error);
  }
};
seeRole();
