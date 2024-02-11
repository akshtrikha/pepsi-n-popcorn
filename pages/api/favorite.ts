import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'POST') {
            const { currentUser } = await serverAuth(req, res);
            console.log("Inside /api/favorite/");
            console.log(currentUser);
            const { movieId } = req.body;

            const existingMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId
                }
            });

            if (!existingMovie) {
                throw new Error("Invalid Movie Id");
            }

            const user = await prismadb.user.update({
                where: {
                    email: currentUser.email
                },
                data: {
                    favoriteIds: {
                        push: movieId
                    }
                }
            });

            return res.status(200).json(user);
        }

        if (req.method === 'DELETE') {
            const { currentUser } = await serverAuth(req, res);
            const { movieId } = req.body;

            const existingMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId
                }
            });

            if (!existingMovie) {
                throw new Error("Invalid Movie Id");
            }

            const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

            const user = await prismadb.user.update({
                where: {
                    email: currentUser.email
                },
                data: {
                    favoriteIds: updatedFavoriteIds
                }
            })

            return res.status(200).json(user);
        }

        return res.status(405).end();
    } catch (err) {
        console.log("Inside the catch block of /api/favorite/");
        console.error("/api/favorite/", err);
        return res.status(400).end();
    }
}