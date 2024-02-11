import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/lib/prismadb"
import serverAuth from "@/lib/serverAuth"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await serverAuth(req, res);          //? This is to check if the user is logged in or not.

        const movieCount = await prismadb.movie.count();
        const randomIndex = Math.floor(Math.random() * movieCount);

        const randomMovie = await prismadb.movie.findMany({
            take: 1,
            skip: randomIndex
        })

        return res.status(200).json(randomMovie[0])
    } catch (err) {
        console.log("api/random: ", err);
        res.status(400).send({ message: err });
    }
}