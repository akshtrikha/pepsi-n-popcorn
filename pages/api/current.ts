import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        res.status(405).end();
    }

    try {
        const { currentUser } = await serverAuth(req, res);
        res.status(200).json(currentUser);
    } catch (err) {
        console.log("pages/api/current.ts ", err);
        res.status(400).end();
    }
}