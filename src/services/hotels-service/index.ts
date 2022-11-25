import { notFoundError } from "@/errors";
import hotelsRepository from "@/repositories/hotels-repository";

async function getHotels() {
  const hotels = hotelsRepository.findHotels();

  if(!hotels) {
    throw(notFoundError);
  }
  return hotels;
}

async function getHotelRooms(hotelId: number) {
  const hotel = hotelsRepository.findHotelById(hotelId);

  if(!hotel) {
    throw(notFoundError);
  }
  return hotel;
}

const hotelsService = {
  getHotels,
  getHotelRooms
};
export default hotelsService;
