import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).end();
    }

    try {
        const { currentUser } = await serverAuth(req, res);

        if (!currentUser) {
            return res.status(403).end();
        }

        const favoriteMovies = await prismadb.movie.findMany({
            where: {
                id: {
                    in: currentUser?.favoriteIds
                }
            }
        });

        return res.status(200).send(favoriteMovies);

    } catch (err) {
        return res.status(400).json(err);
    }
}