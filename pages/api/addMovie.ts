import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if(req.method !== "POST") {
        return res.status(405).end();
    }

    try {
        const {title, description, videoUrl, thumbnailUrl, genre, duration} = req.body;

        await prismadb.movie.create({
            data: {
                title: title,
                description: description,
                videoUrl: videoUrl,
                thumbnailUrl: thumbnailUrl,
                genre: genre,
                duration: duration
            }
        })

        res.status(200).send({message: "Movie Uploaded Successfully"})

    } catch(err) {
        console.log("addMovie: ", err);
        // throw new Error(err);
        return res.status(400).send({message: err})
    }
}