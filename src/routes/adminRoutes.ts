import express from "express";
import {
  addGroceryItemController,
  getAllGroceryItemsController,
  removeGroceryItemController,
  updateGroceryItemController,
  updateInventoryController,
} from "../controllers/groceryItemController";

const router = express.Router();

router.post("/grocery-items", addGroceryItemController);
router.get("/grocery-items", getAllGroceryItemsController);
router.delete("/grocery-items/:id", removeGroceryItemController);
router.put("/grocery-items/:id", updateGroceryItemController);
router.patch("/grocery-items/:id/inventory", updateInventoryController);

export default router;
