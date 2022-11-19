import { paymentType } from "@/protocols";
import paymentsRepository from "@/repositories/payments-repository";

export async function getPaymentByTicketId(id: number) {
  return paymentsRepository.getPaymentByTicketId(id);
}

export async function postPayment(data: paymentType) {
  return paymentsRepository.postPayment(data);
}

const paymentServices = {
  getPaymentByTicketId,
  postPayment
};
export default paymentServices;
