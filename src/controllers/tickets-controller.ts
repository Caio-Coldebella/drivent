import enrollmentsService from "@/services/enrollments-service";
import ticketsService from "@/services/tickets-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function ticketstypes(req: Request, res: Response) {
  try {
    const data = await ticketsService.getTicketsTypes();
    res.status(httpStatus.OK).send(data);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);    
  }
}

export async function gettickets(req: Request, res: Response) {
  try {
    const data = await ticketsService.getTickets();
    if(!data) {
      res.sendStatus(httpStatus.NOT_FOUND);
      return;
    }
    res.status(httpStatus.OK).send(data);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function postTickets(req: Request, res: Response) {
  const tickettypeid: number = req.body.ticketTypeId;
  if(!tickettypeid) {
    res.sendStatus(httpStatus.BAD_REQUEST);
    return;
  }
  try {
    const existsid = await ticketsService.getTicketTypeById(tickettypeid);
    if(!existsid) {
      res.sendStatus(httpStatus.BAD_REQUEST);
      return;
    }
    const enrollment = await enrollmentsService.enrollmentId();
    if(!enrollment) {
      res.sendStatus(httpStatus.NOT_FOUND);
      return;
    }
    const ticket = await ticketsService.postTickets(tickettypeid, enrollment.id);
    const data = await ticketsService.getTicketById(ticket.id);
    res.status(httpStatus.CREATED).send(data);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
