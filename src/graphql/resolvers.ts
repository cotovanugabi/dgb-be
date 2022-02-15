import { prisma } from "../lib/prisma";

export const resolvers = {
  Query: {
    seasons: () => {
      return prisma.season.findMany();
    },
  },
  Mutation: {
    createSeason: (_parent: any, { input: { name } }: any) => {
      return prisma.season.create({
        data: {
          name,
        },
      });
    },
  },
};
