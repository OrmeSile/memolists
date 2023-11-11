import prisma from "@/utils/database/databaseClient";
import fs from "node:fs";
import readline from "node:readline"
import events from "node:events";

(async function lineByLine() {
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
      const {id,
        video,
        ...rest
      } = {
        ...movieJSON,
        tmdb_id: movieJSON.id
      }
      movies.push(rest)
    });
    await events.once(rl, 'close')
    await prisma.movie.createMany({
      // @ts-ignore
      data: movies,
      skipDuplicates: true
    })
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
  } catch (err) {
    console.log(err)
  }
})()
