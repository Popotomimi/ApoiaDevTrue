"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { error } from "console";
import { stripe } from "@/lib/stripe";

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

  if (!data.creatorId) {
    return {
      data: null,
      error: "Falha ao criar o pagamento 1",
    };
  }

  try {
    const creator = await prisma.user.findFirst({
      where: {
        connectedStripeAccount: data.creatorId,
      },
    });

    if (!creator) {
      return {
        data: null,
        error: "Falha ao criar o pagamento 2",
      };
    }

    const applicationFeeAmount = Math.floor(data.price * 0.1);

    const donation = await prisma.donation.create({
      data: {
        donorName: data.name,
        donorMessage: data.message,
        userId: creator.id,
        status: "PENDING",
        amount: data.price - applicationFeeAmount,
      },
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.HOST_URL}/creator/${data.slug}`,
      cancel_url: `${process.env.HOST_URL}/creator/${data.slug}`,
      line_items: [
        {
          price_data: {
            currency: "brl",
            product_data: {
              name: "Apoar: " + creator.name,
            },
            unit_amount: data.price,
          },
          quantity: 1,
        },
      ],
      payment_intent_data: {
        application_fee_amount: applicationFeeAmount,
        transfer_data: {
          destination: creator.connectedStripeAccount as string,
        },
        metadata: {
          donorName: data.name,
          donorMessage: data.message,
          donationId: donation.id,
        },
      },
    });

    return {
      data: JSON.stringify(session),
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: "Falha ao criar o pagamento 3",
    };
  }
}
