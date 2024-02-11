import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.body);
    if (req.method !== "POST") {
        res.status(405).json({ message: "Invalid Request Method" })
    }

    try {
        const { email, name, password } = req.body;

        const existingUser = await prismadb.user.findUnique({
            where: {
                email: email
            }
        })

        if (existingUser) {
            return res.status(422).json({ message: "A user already exists with this email id." })
        }

        console.log("Record created");
        
        await prismadb.user.create({
            data: {
                email: email,
                name: name,
                hashedPassword: await bcrypt.hash(password, 5)
            }
        });

        return res.status(200).json(req.body);
    }
     catch (err) {
        // console.log(err);
        return res.status(400).json({ message: err })
    }

}