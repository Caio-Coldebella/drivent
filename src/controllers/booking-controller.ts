import { AuthenticatedRequest } from "@/middlewares";
import bookingService from "@/services/booking-service";
import hotelService from "@/services/hotels-service";
import ticketService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function postBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const roomId: number = req.body.roomId;
  try {
    const ticket = await ticketService.getTicketByUserId(userId);
    if(ticket.TicketType.isRemote || !ticket.TicketType.includesHotel || ticket.status === "RESERVED") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    const room = await hotelService.getRoomById(roomId);
    if(!room) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if(room.Booking.length === room.capacity) {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    const posted = await bookingService.postBooking(userId, roomId);
    return res.status(httpStatus.OK).send({ "bookingId": posted.id });
  } catch (error) {
    return res.sendStatus(httpStatus.FORBIDDEN);
  }
}

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const booking = await bookingService.getBooking(userId);
    if(booking) {
      return res.status(httpStatus.OK).send(booking);
    }else {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  } catch (error) {
    return res.sendStatus(httpStatus.FORBIDDEN);
  }
}

export async function putBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const bookingid = req.params.bookingId;
  if(!bookingid) {
    return res.sendStatus(httpStatus.FORBIDDEN);
  }
  const bookingId = parseInt(bookingid);
  const roomId: number = req.body.roomId;
  try {
    const ticket = await ticketService.getTicketByUserId(userId);
    if(ticket.TicketType.isRemote || !ticket.TicketType.includesHotel || ticket.status === "RESERVED") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    const room = await hotelService.getRoomById(roomId);
    if(!room) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if(room.Booking.length === room.capacity) {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    const booking = await bookingService.getBooking(userId);
    if(!booking || booking.id != bookingId) {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    const updated = await bookingService.putBooking(bookingId, roomId);
    return res.status(httpStatus.OK).send({ "bookingId": updated.id });
  } catch (error) {
    return res.sendStatus(httpStatus.FORBIDDEN);
  }
}
