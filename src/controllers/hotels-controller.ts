import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import ticketService from "@/services/tickets-service";
import hotelsService from "@/services/hotels-service";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const ticket = await ticketService.getTicketByUserId(userId);
    if(!ticket.TicketType.includesHotel || ticket.TicketType.isRemote || ticket.status != "PAID") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    const hotels = await hotelsService.getHotels();
    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getRooms(req: AuthenticatedRequest, res: Response) {
  const hotelidparam = req.params.hotelId;
  if(!hotelidparam) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  const hotelid = Number(hotelidparam);
  if(isNaN(hotelid)) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  const { userId } = req;
  try {
    const ticket = await ticketService.getTicketByUserId(userId);
    if(!ticket.TicketType.includesHotel || ticket.TicketType.isRemote || ticket.status != "PAID") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    const hotel = await hotelsService.getHotelRooms(hotelid);
    if(!hotel) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).send(hotel);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
