import {User} from "@prisma/client";

type ClientList = {
  id?: string,
  title?: string,
  rows?: ClientRow[],
  user: User,
}

type ClientRow = {
  id?: string,
  createdAt?: Date,
  content?: string,
}