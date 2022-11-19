import { Request, Response } from "express";
import httpStatus from "http-status";
import ticketsService from "@/services/tickets-service";
import enrollmentsService from "@/services/enrollments-service";
import paymentServices from "@/services/payments-service";
import { paymentType, paymentTypeEntity } from "@/protocols";

export async function getPayments(req: Request, res: Response): Promise<paymentTypeEntity> {
  const query = JSON.stringify(req.query.ticketId);
  if(!query) {
    res.sendStatus(httpStatus.BAD_REQUEST);
    return;
  }
  const ticketId: number = parseInt(query.slice(1, query.length - 1));
  if(!ticketId) {
    res.sendStatus(httpStatus.BAD_REQUEST);
    return;
  }
  try {
    const hasticket = await ticketsService.getTicketById(ticketId);
    if(!hasticket) {
      res.sendStatus(httpStatus.NOT_FOUND);
      return;
    }
    const enrollment = await enrollmentsService.enrollmentId();
    if(enrollment && hasticket.enrollmentId === enrollment.id) {
      const data: paymentTypeEntity = await paymentServices.getPaymentByTicketId(hasticket.id);
      res.status(httpStatus.OK).send(data);
    }else {
      res.sendStatus(httpStatus.UNAUTHORIZED);
      return;
    }
  } catch (error) {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
  return null;    
}

export async function postPayments(req: Request, res: Response): Promise<paymentTypeEntity> {
  const data = req.body;
  const ticketId = data.ticketId;
  const cardData = data.cardData;
  if(!ticketId || !cardData) {
    res.sendStatus(httpStatus.BAD_REQUEST);
    return;
  }
  try {
    const hasticket = await ticketsService.getTicketById(ticketId);
    if(!hasticket) {
      res.sendStatus(httpStatus.NOT_FOUND);
      return;
    }
    const enrollment = await enrollmentsService.enrollmentId();
    if(enrollment && hasticket.enrollmentId === enrollment.id) {
      const value = await ticketsService.getTicketTypeById(hasticket.ticketTypeId);
      const cardIssuer = cardData.issuer;
      const cardLastDigits = cardData.number.slice(-4);
      const insertData: paymentType = {
        ticketId: ticketId,
        value: value.price,
        cardIssuer: cardIssuer,
        cardLastDigits: cardLastDigits
      };
      const data = await paymentServices.postPayment(insertData);
      await ticketsService.payTicket(ticketId);
      res.status(httpStatus.OK).send(data);
    }else {
      res.sendStatus(httpStatus.UNAUTHORIZED);
      return;
    }
  } catch (error) {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
