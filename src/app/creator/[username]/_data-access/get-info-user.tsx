"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

const createUsernameSchema = z.object({
  username: z.string({ message: "O username é obirgatório" }),
});

type createUsernameSchema = z.infer<typeof createUsernameSchema>;

export async function getInfoUser(data: createUsernameSchema) {
  const schema = createUsernameSchema.safeParse(data);

  if (!schema.success) {
    return null;
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: data.username,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
}
