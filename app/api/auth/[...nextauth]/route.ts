import NextAuth from "next-auth"
import {config} from "@/utils/database/auth";

const handler = NextAuth(config)

export {handler as GET, handler as POST}