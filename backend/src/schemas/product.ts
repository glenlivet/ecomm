import mongoose from 'mongoose';
import { Product as ProductType } from '../generated/graphql';

export type ProductDocument = mongoose.Document & ProductType;

const productSchema = new mongoose.Schema(
  {
    code: String,
    name: String,
    description: String,
  },
  { timestamps: true },
);

export const Product = mongoose.model<ProductDocument>('Product', productSchema);
