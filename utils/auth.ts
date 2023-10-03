import type {GetServerSidePropsContext, NextApiRequest, NextApiResponse} from "next";
import type {NextAuthOptions} from "next-auth";
import {getServerSession} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import getUser from "@/utils/login";

export const config = {
  providers: [
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
  ]
} satisfies NextAuthOptions

export function auth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse]){
  return getServerSession(...args, config)
}