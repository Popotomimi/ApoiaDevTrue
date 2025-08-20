"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

const createUsernameSchema = z.object({
  slug: z.string().min(1, "O Slug é obrigatório"),
  name: z.string().min(1, "O Nome é obrigatório"),
  message: z.string().min(5, "A mensagem precisa ter no mínimo 5 caracteres"),
  price: z.number().min(1500, "Selecione um valor maior que R$15"),
  creatorId: z.string(),
});

type CreatePaymentSchema = z.infer<typeof createUsernameSchema>;

export async function createPayment(data: CreatePaymentSchema) {
  const schema = createUsernameSchema.safeParse(data);

  if (!schema.success) {
    return {
      data: null,
      error: schema.error.issues[0].message,
    };
  }

  try {
    console.log(data);
  } catch (error) {
    return {
      data: null,
      error: "Falha ao criar o pagamento",
    };
  }
}
