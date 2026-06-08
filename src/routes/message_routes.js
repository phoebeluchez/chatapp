import express from "express";

import { protectRoute } from "../middleware/auth_middleware.js";
import { getUsersForSidebar, getMessages } from "../controllers/message_controller.js ";
const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);

router.get("/:id", protectRoute, getMessages);

export default router;
