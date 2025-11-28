import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

import { userModel } from "@/model/userModel";
import { roleModel } from "@/model/roleModel";
import { userRoleModel } from "../model/userRole.Model"; // <-- fixed

dotenv.config();

export const seedAdmin = async () => {
  try {
    // 1️⃣ Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) throw new Error("MONGODB_URI not set in .env");

    await mongoose.connect(mongoUri);
    console.log("✔️ MongoDB connected");

    // 2️⃣ Get admin credentials
    const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_PHONE } =
      process.env;
    if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
      throw new Error("Admin credentials missing in .env");
    }

    // 3️⃣ Seed Admin Role
    let adminRole = await roleModel.findOne({ name: "Admin" });
    if (!adminRole) {
      adminRole = await roleModel.create({
        name: "Admin",
        description: "System administrator with full permissions",
      });
      console.log("✔️ Admin role created");
    }

    // 4️⃣ Seed Admin User
    let adminUser = await userModel.findOne({ email: ADMIN_EMAIL });
    if (!adminUser) {
      const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
      adminUser = await userModel.create({
        name: ADMIN_NAME,
        email: ADMIN_EMAIL,
        password: hashedPassword,
        roles: [adminRole._id], // use array of role IDs
        phone: ADMIN_PHONE,
        isActive: true,
      });
      console.log("✔️ Admin user created");
    } ;

    // 5️⃣ Link Admin User → Admin Role
    const exists = await userRoleModel.findOne({
      userId: adminUser._id,
      roleId: adminRole._id,
    });
    if (!exists) {
      await userRoleModel.create({
        userId: adminUser._id,
        roleId: adminRole._id,
      });
      console.log("✔️ Admin role assigned to admin user");
    } else {
      console.log("✔️ Admin user already has Admin role");
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed admin failed:", err);
    await mongoose.disconnect();
    process.exit(1);
  }
};

// Optional: run directly
seedAdmin();
