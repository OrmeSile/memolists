import type {GetServerSidePropsContext, NextApiRequest, NextApiResponse} from "next";
import type {NextAuthOptions} from "next-auth";
import {getServerSession} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import {PrismaAdapter} from "@auth/prisma-adapter";
import getUser from "@/utils/database/login";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export const config = {
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST!,
        port: process.env.EMAIL_SERVER_PORT!,
        auth:{
          user: process.env.EMAIL_SERVER_USER!,
          pass: process.env.EMAIL_SERVER_PASSWORD!,
        },
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
        name: "Credentials",
        credentials: {
          username: {label: 'Username', type: 'text'},
          password: {label: 'Password', type: 'password'},
        },
        async authorize(credentials, req){
          return await getUser(credentials!.username, credentials!.password) as any
        },
      }
    )
  ],
  callbacks: {
    async session({session, user}){
      if(session.user !== undefined && session.user !== null){
        session.user.id = (session && session.user) ? user.id: undefined
      }
      return session
    }
  },
  adapter: PrismaAdapter(prisma),
} satisfies NextAuthOptions;

export function auth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse]){
  return getServerSession(...args, config)
}