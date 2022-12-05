import faker from "@faker-js/faker";
import { prisma } from "@/config";

//Sabe criar objetos - Hotel do banco
export async function createHotel() {
  return await prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.image.imageUrl(),
    }
  });
}

export async function createRoomWithHotelId(hotelId: number) {
  return prisma.room.create({
    data: {
      name: faker.company.companyName(),
      capacity: 3,
      hotelId: hotelId,
    }
  });
}

export async function createRoomWithCapacity(hotelId: number, capacity: number) {
  return prisma.room.create({
    data: {
      name: faker.company.companyName(),
      capacity: capacity,
      hotelId: hotelId,
    }
  });
}

export async function createRoom(hotelId: number) {
  const date = new Date();
  const insertdate = date.toISOString();
  return prisma.room.create({
    data: {
      name: faker.lorem.word(),
      capacity: Math.floor(Math.random()*2 + 1),
      hotelId: hotelId,
      createdAt: insertdate,
      updatedAt: insertdate
    }
  });
}
