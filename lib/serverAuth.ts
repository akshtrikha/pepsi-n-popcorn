import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import prismadb from '@/lib/prismadb';
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions);
    console.log("serverAuth, session: ", session);
    console.log("serverAuth, session.user: ", session?.user);
    console.log("serverAuth, session.user.email: ", session?.user?.email);

    if (!session?.user?.email) {
        throw new Error('Not signed in');
    }

    const currentUser = await prismadb.user.findUnique({
        where: {
            email: session.user.email,
        }
    });

    if (!currentUser) {
        throw new Error('Not signed in');
    }

    return { currentUser };
}

export default serverAuth;

// import { NextApiRequest } from "next";
// import { getSession } from "next-auth/react";

// import prismadb from "@/lib/prismadb";

// const serverAuth = async (req: NextApiRequest) => {        //? This function takes our incoming request as its parameter
//     console.log(req.rawHeaders);
//     const session = await getSession({ req })           //? getSession will take our incoming request and extract the current session from it using contained JWT
//     console.log("serverAuth - 1");
//     console.log("session: ", session);
//     console.log("session.user: ", session?.user);
//     console.log("session.user.email: ", session?.user?.email);
//     if (!session?.user?.email) {                         //? We check if the session contains valid credentials to verify if the user is signedIn
//         throw new Error("Not Signed In");
//     }
//     console.log("serverAuth - 2");
//     const currentUser = await prismadb.user.findUnique({
//         where: {
//             email: session.user.email
//         }
//     });
//     console.log("serverAuth - 3");
//     if (!currentUser) {
//         throw new Error("Not Signed In");
//     }

//     return { currentUser }
// }

// export default serverAuth;