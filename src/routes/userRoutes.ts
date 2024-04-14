import express from "express";
import {
  getAvailableItemsController,
  createOrderController,
} from "../controllers/userController";

const router = express.Router();

router.get("/grocery-items", getAvailableItemsController);
router.post("/orders", createOrderController);

export default router;
