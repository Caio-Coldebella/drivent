import { prisma } from "@/config";

export async function findTicketsTypes() {
  return prisma.ticketType.findMany();
}

export async function findTicketTypeById(id: number) {
  return prisma.ticketType.findUnique({
    where: {
      id: id
    }
  });
}

export async function findTickets() {
  return prisma.ticket.findFirst({
    select: {
      id: true,
      status: true,
      ticketTypeId: true,
      enrollmentId: true,
      TicketType: true,
      createdAt: true,
      updatedAt: true
    }
  });
}

export async function findTicketById(id: number) {
  return prisma.ticket.findUnique({
    where: {
      id: id
    },
    select: {
      id: true,
      status: true,
      ticketTypeId: true,
      enrollmentId: true,
      TicketType: true,
      createdAt: true,
      updatedAt: true
    }
  });
}

export async function postTicket(ticketid: number, enrollmentid: number) {
  return prisma.ticket.create({
    data: {
      ticketTypeId: ticketid,
      enrollmentId: enrollmentid,
      status: "RESERVED"
    }
  });
}

export async function setPaidTicket(ticketid: number) {
  return prisma.ticket.update({
    where: {
      id: ticketid
    },
    data: {
      status: "PAID"
    }
  });
}

const ticketsRepository = {
  findTicketsTypes,
  findTicketTypeById,
  findTickets,
  postTicket,
  findTicketById,
  setPaidTicket
};

export default ticketsRepository;
