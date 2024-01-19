import type {NextAuthOptions} from "next-auth";
import {getServerSession as originalGetServerSession} from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import {PrismaAdapter} from "@auth/prisma-adapter";
import getUser from "@/utils/database/login";
import {cookies, headers} from 'next/headers';
import prisma from "@/utils/database/databaseClient";


export const config = {
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST!,
        port: process.env.EMAIL_SERVER_PORT!,
        auth: {
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
          email: {label: 'Email', type: 'text'},
          password: {label: 'Password', type: 'password'},
        },
        async authorize(credentials, req) {
          return await getUser(credentials!.email, credentials!.password) as any
        },
      }
    )
  ],
  callbacks: {
    async session({session, user}) {
      if (session.user) {
        session.user.id = user.id
      }
      return session
    },
    async redirect({url, baseUrl}) {
      if (url === `${baseUrl}/auth/signin`) return `${baseUrl}/home`
      else if (url === `${baseUrl}/auth/signout`) return `${baseUrl}`
      else if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },
  adapter: PrismaAdapter(prisma),
} satisfies NextAuthOptions;

export const getServerSession = async () => {
  const req = {
    headers: Object.fromEntries(headers() as Headers),
    cookies: Object.fromEntries(
      cookies()
        .getAll()
        .map((c) => [c.name, c.value]),
    ),
  };
  const res = {
    getHeader() {
    }, setCookie() {
    }, setHeader() {
    }
  };
  // @ts-ignore
  return await originalGetServerSession(req, res, config);
};
