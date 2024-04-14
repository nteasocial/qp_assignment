import { Request, Response } from "express";
import {
  addGroceryItem,
  getAllGroceryItems,
  removeGroceryItemById,
  updateGroceryItemById,
  updateInventoryById,
} from "../models/dbUtils";

export const addGroceryItemController = async (req: Request, res: Response) => {
  const { name, price, inventory_level } = req.body;
  try {
    const newItem = await addGroceryItem(name, price, inventory_level);
    res.status(201).json({ message: "Item added successfully", data: newItem });
  } catch (error: any) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error(error);
    res
      .status(500)
      .json({ error: "Error adding new item", details: errorMessage });
  }
};

export const getAllGroceryItemsController = async (
  req: Request,
  res: Response
) => {
  try {
    const items = await getAllGroceryItems();
    res.json({ message: "Items fetched successfully", data: items });
  } catch (error: any) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error(error);
    res
      .status(500)
      .json({ error: "Error fetching items", details: errorMessage });
  }
};

export const removeGroceryItemController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    await removeGroceryItemById(parseInt(id));
    res.status(200).json({ message: "Item removed successfully" });
  } catch (error: any) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error(error);
    res
      .status(500)
      .json({ error: "Error removing item", details: errorMessage });
  }
};

export const updateGroceryItemController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { name, price, inventory_level } = req.body;
  try {
    const updatedItem = await updateGroceryItemById(parseInt(id), {
      name,
      price,
      inventory_level,
    });
    res.json({ message: "Item updated successfully", data: updatedItem });
  } catch (error: any) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error(error);
    res
      .status(500)
      .json({ error: "Error updating item", details: errorMessage });
  }
};

export const updateInventoryController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { inventory_level } = req.body;
  try {
    const updatedItem = await updateInventoryById(
      parseInt(id),
      inventory_level
    );
    res.json({
      message: "Inventory updated successfully",
      data: updatedItem,
    });
  } catch (error: any) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error(error);
    res
      .status(500)
      .json({ error: "Error updating inventory", details: errorMessage });
  }
};
