import { signOut } from "next-auth/react";
// import { getSession } from "next-auth/react";
// import { NextApiRequest, NextApiResponse } from "next";

export default function Logout() {
    signOut({callbackUrl: '/'});
    return (
        <h1 className="text-green-400">This is the logout page!</h1>
    )
}

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     try {
//         const session = await getSession({ req });
//         console.log("This is the session: ", session);
//         signOut();
//         res.status(200).json({ message: "okokok" })
//     } catch (err) {
//         console.log("this is an error!!!", err);
//         res.status(400).end();
//     }
// }