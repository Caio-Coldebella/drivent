import bookingRepository from "@/repositories/booking-repository";

async function postBooking(userId: number, roomId: number) {
  const booking = await bookingRepository.insertBooking(userId, roomId);
  return booking;
}

async function getBooking(userId: number) {
  const booking = bookingRepository.selectBooking(userId);
  return booking;
}

async function putBooking(bookingId: number, roomId: number) {
  return bookingRepository.updateBooking(bookingId, roomId);
}

const bookingService = {
  postBooking,
  getBooking,
  putBooking
};
export default bookingService;
