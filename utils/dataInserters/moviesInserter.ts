import prisma from "@/utils/database/databaseClient";
import fs from "node:fs";
import readline from "node:readline"
import events from "node:events";
import {existsSync, mkdirSync} from "fs";
import * as zlib from "zlib";
import {pipeline} from "node:stream";
import * as http from "http";

const createDirIfNotExists = (dir: fs.PathLike) => {
  !existsSync(dir) ? mkdirSync(dir) : undefined
}
const movieFolderPath = `${__dirname}/../../data/movies`
const archivePath = `${movieFolderPath}/movies.gz`;
const jsonPath = `${movieFolderPath}/movies.json`
const currentDate = new Date();
const formattedDate = `${currentDate.getUTCMonth()}_${currentDate.getUTCDate()}_${currentDate.getUTCFullYear()}`;
const moviePrefixer = 'movie_ids_';
const fullRemoteFileName= `${moviePrefixer}${formattedDate}.json.gz`;
const baseFetchUrl = 'http://files.tmdb.org/p/exports/'
const combinedFetchUrl = `${baseFetchUrl}${fullRemoteFileName}`;

(() => {
  try{
    http.get(combinedFetchUrl, (res) => {
      createDirIfNotExists(movieFolderPath)
      if(fs.existsSync(archivePath)) fs.unlinkSync(archivePath)
      const writeStream = fs.createWriteStream(archivePath)
      res.pipe(writeStream)
      writeStream.on('finish', () => {
        writeStream.close();
        console.log(`download completed for ${formattedDate} movie IDs`);
        unzipArchive();
        lineByLine()
      })
    })
  } catch(err) {
    console.log(err)
  }
})()

const unzipArchive = () => {
  const unzip = zlib.createUnzip()
  const input = fs.createReadStream(archivePath)
  const output = fs.createWriteStream(jsonPath)
  pipeline(input, unzip, output, (err) => {
    if(err) console.log("pipeline failed", err)
  })
}

async function lineByLine() {
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream('./data/movies/movies.json'),
      crlfDelay: Infinity
    })
    const movies = [] as {
      adult: boolean,
      tmdb_id: number,
      original_title: string,
      popularity: number
    }[]
    rl.on('line', (line) => {
      const movieJSON: {
        adult: boolean,
        id: number,
        original_title: string,
        popularity: number,
        video: boolean
      } = JSON.parse(line)
      const {
        id,
        video,
        ...rest
      } = {
        ...movieJSON,
        tmdb_id: movieJSON.id
      }
      movies.push(rest)
    });
    await events.once(rl, 'close')
    const create = await prisma.movie.createMany({
      // @ts-ignore
      data: movies,
      skipDuplicates: true
    })
    console.log(`created ${create.count} entries`)
  } catch (err) {
    console.log(err)
  }
}
