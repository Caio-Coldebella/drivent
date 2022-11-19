import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function create(data: Prisma.SessionUncheckedCreateInput) {
  return prisma.session.create({
    data,
  });
}

async function getuserId(tk: string) {
  return prisma.session.findFirst({
    where: {
      token: tk
    }
  });
}

const sessionRepository = {
  create,
  getuserId
};

export default sessionRepository;
