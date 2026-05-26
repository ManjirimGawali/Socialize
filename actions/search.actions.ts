"use server";

import prisma from "@/lib/prisma";

export async function searchUsers(query: string) {
  ///to remove spaces from beginning and end
  if (!query.trim()) return [];

  return await prisma.user.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          username: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },

    select: {
      id: true,
      name: true,
      username: true,
      image: true,
      bio: true,
      _count: {
        select: {
          followers: true,
        },
      },
    },

    take: 10,
  });
}