import { prisma } from "@/config";
import { paymentType } from "@/protocols";

export async function getPaymentByTicketId(ticketid: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId: ticketid
    },
    select: {
      id: true,
      ticketId: true,
      value: true,
      cardIssuer: true,
      cardLastDigits: true,
      createdAt: true,
      updatedAt: true
    }
  });   
}

export async function postPayment(data: paymentType) {
  return prisma.payment.create({
    data: {
      ticketId: data.ticketId,
      value: data.value,
      cardIssuer: data.cardIssuer,
      cardLastDigits: data.cardLastDigits
    }
  });
}

const paymentsRepository = {
  getPaymentByTicketId,
  postPayment
};
export default paymentsRepository;
