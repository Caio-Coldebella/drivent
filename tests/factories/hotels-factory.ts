import faker from "@faker-js/faker";
import { prisma } from "@/config";

export async function createHotel() {
  const date = new Date();
  const insertdate = date.toISOString();
  return prisma.hotel.create({
    data: {
      name: faker.company.companyName(),
      image: faker.image.city(),
      createdAt: insertdate,
      updatedAt: insertdate
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
