import { gettickets, postTickets, ticketstypes } from "@/controllers/tickets-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/", gettickets)
  .post("/", postTickets)
  .get("/types", ticketstypes);

export { ticketsRouter };
