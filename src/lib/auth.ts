import NextAuth from "next-auth";
import { prisma } from "./prisma";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET!,
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  providers: [GitHub],
});
