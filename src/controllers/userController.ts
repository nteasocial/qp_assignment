import { Request, Response } from "express";
import { getAvailableGroceryItems, createOrder } from "../models/dbUtils";

export const getAvailableItemsController = async (
  req: Request,
  res: Response
) => {
  try {
    const availableItems = await getAvailableGroceryItems();
    res.json(availableItems);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching available items");
  }
};

export const createOrderController = async (req: Request, res: Response) => {
  const { items } = req.body;
  try {
    const newOrder = await createOrder(items);
    res.status(201).json(newOrder);
    if (
      !items ||
      !Array.isArray(items) ||
      items.some((item) => !item.groceryItemId || item.quantity == null)
    ) {
      return res.status(400).send("Invalid order format");
    }
  } catch (error: any) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Error creating order:", errorMessage);
    res
      .status(500)
      .json({ error: "Error creating order", details: errorMessage });
  }
};
