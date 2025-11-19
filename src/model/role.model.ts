import mongoose, { Schema, Document } from "mongoose";

export interface IRole extends Document {
  id: number;      // primary key
  name: string;    // role name: admin, farmer, customer
}

const roleSchema = new Schema<IRole>({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  }
});

const Role = mongoose.model<IRole>("Role", roleSchema);

export default Role;
