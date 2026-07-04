import { Router } from "express";
import verifyToken from "../middleware/auth.middleware.js";
import {addExpense,getAllExpenses,deleteExpense,updateExpense,} from "./expense.controller.js";
const expenseRouter = Router();

// Add Expense
expenseRouter.post("/add", verifyToken, addExpense);
expenseRouter.get("/all", verifyToken, getAllExpenses);
expenseRouter.delete("/delete/:id", verifyToken, deleteExpense);
expenseRouter.put("/update/:id",verifyToken,updateExpense);
export default expenseRouter;