import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const email = req.body.email;

    try {
        await prismadb.user.delete({
            where: {
                email: email
            }
        })

        return res.status(200).json({ message: `Deleted user with the email: ${email}` })
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: err });
    }
}