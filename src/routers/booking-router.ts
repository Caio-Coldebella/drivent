import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getBooking, postBooking, putBooking } from "@/controllers/booking-controller";
import { bookingSchema } from "@/schemas/booking-schemas";

const bookingRouter = Router();

bookingRouter
  .all("*", authenticateToken)
  .put("/:bookingId", validateBody(bookingSchema), putBooking)
  .get("", getBooking)
  .post("", validateBody(bookingSchema), postBooking);
export { bookingRouter };
