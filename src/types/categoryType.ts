import { Document } from "mongodb";
import { Types } from "mongoose";
export interface CategoryType extends Document {
    _id: Types.ObjectId;
    name: string;
    description: string;
   
}