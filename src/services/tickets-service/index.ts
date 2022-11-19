import ticketsRepository from "@/repositories/tickets-repository";

export async function getTicketsTypes() {
  return ticketsRepository.findTicketsTypes();
}

export async function getTicketTypeById(id: number) {
  return ticketsRepository.findTicketTypeById(id);    
}

export async function getTickets() {
  return ticketsRepository.findTickets();
}

export async function getTicketById(id: number) {
  return ticketsRepository.findTicketById(id);  
}

export async function postTickets(id: number, enrolmentid: number) {
  return ticketsRepository.postTicket(id, enrolmentid);
}

export async function payTicket(id: number) {
  return ticketsRepository.setPaidTicket(id);
}

const ticketsService = {
  getTicketsTypes,
  getTicketTypeById,
  getTickets,
  getTicketById,
  postTickets,
  payTicket
};

export default ticketsService;
