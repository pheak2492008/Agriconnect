import { Request, Response } from "express";
import {
  createProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
  deleteProductService,
} from "../services/productService";

export const createProductController = async (req: Request, res: Response) => {
  try {
    const product = await createProductService(req.body);
    return res.status(201).json(product);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

export const getAllProductsController = async (req: Request, res: Response) => {
  try {
    const products = await getAllProductsService();
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getProductByIdController = async (req: Request, res: Response) => {
  try {
    const product = await getProductByIdService(req.params.id);
    return res.json(product);
  } catch (error) {
    return res.status(404).json({ message: "Product not found" });
  }
};

export const updateProductController = async (req: Request, res: Response) => {
  try {
    const product = await updateProductService(req.params.id, req.body);
    return res.json(product);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

export const deleteProductController = async (req: Request, res: Response) => {
  try {
    await deleteProductService(req.params.id);
    return res.json({ message: "Product deleted" });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};
