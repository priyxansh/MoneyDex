import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    signIn: async ({ user, account }) => {
      try {
        const { id, name, email, image } = user;
        const loginProvider = account?.provider as string;

        const existingUser = await prisma.user.findUnique({
          where: {
            email: email as string,
          },
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            oAuthProviders: true,
          },
        });

        if (existingUser) {
          if (
            existingUser.oAuthProviders.some(
              (provider) => provider.provider === loginProvider
            )
          ) {
            return true;
          }

          await prisma.user.update({
            where: {
              id: existingUser.id,
            },
            data: {
              oAuthProviders: {
                create: [
                  {
                    provider: loginProvider,
                    providerUserId: id,
                  },
                ],
              },
            },
          });

          return true;
        }

        await prisma.user.create({
          data: {
            name: name as string,
            email: email as string,
            image: image,
            oAuthProviders: {
              create: [
                {
                  provider: loginProvider,
                  providerUserId: id,
                },
              ],
            },
            accounts: {
              create: [
                {
                  name: "Primary",
                },
              ],
            },
            transactionCategories: {
              create: [
                {
                  name: "Food",
                  type: "EXPENSE",
                },
                {
                  name: "Transportation",
                  type: "EXPENSE",
                },
                {
                  name: "Entertainment",
                  type: "EXPENSE",
                },
                {
                  name: "Shopping",
                  type: "EXPENSE",
                },
                {
                  name: "Other",
                  type: "EXPENSE",
                },
                {
                  name: "Salary",
                  type: "INCOME",
                },
                {
                  name: "Gift",
                  type: "INCOME",
                },
                {
                  name: "Investment",
                  type: "INCOME",
                },
                {
                  name: "Freelance",
                  type: "INCOME",
                },
                {
                  name: "Other",
                  type: "INCOME",
                },
              ],
            },
          },
        });

        return true;
      } catch (error) {
        return false;
      }
    },
    jwt: async ({ token, user, account, trigger }) => {
      if (trigger === "signIn" && account?.type === "oauth") {
        const existingUser = await prisma.user.findUnique({
          where: {
            email: user.email as string,
          },
          select: {
            id: true,
            name: true,
            image: true,
          },
        });

        token.id = existingUser?.id;
        token.name = existingUser?.name;
        token.image = existingUser?.image;
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.user = {
        ...session.user,
        id: token.id as string,
      };

      return session;
    },
  },
};

export const handler = NextAuth(authOptions);
