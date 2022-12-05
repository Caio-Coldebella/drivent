import { prisma } from "@/config";

async function insertBooking(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      userId: userId,
      roomId: roomId
    }
  });
}

async function selectBooking(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId: userId
    },
    select: {
      id: true,
      Room: true
    }
  });
}

async function updateBooking(bookingId: number, roomId: number) {
  return prisma.booking.upsert({
    where: {
      id: bookingId
    },
    create: {
      userId: 1,
      roomId: roomId
    },
    update: {
      roomId: roomId
    }
  });
}

const bookingRepository = {
  insertBooking,
  selectBooking,
  updateBooking
};

export default bookingRepository;
