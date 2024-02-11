import {NextApiRequest, NextApiResponse} from "next";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if(req.method !== "GET") {
        return res.status(405).end();
    }

    try {
        console.log("inside /api/movies/[movieId].ts");
        await serverAuth(req, res);

        const {movieId} = req.query;

        if(typeof movieId !== 'string') {
            throw new Error("Invalid Movie ID");
        }

        if(!movieId) {
            return res.status(404).send("Movie ID Not found");
        }

        const movie = await prismadb.movie.findUnique({
            where: {
                id: movieId
            }
        });

        if(!movie) {
            return res.status(404).send("Movie Not Found");
        }
        console.log(movie);
        return res.status(200).json(movie);
    } catch(err) {
        console.log("/api/movies/[movieId].ts", err);
        res.status(400).end();
    }
}