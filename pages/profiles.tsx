import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback } from "react";

import useCurrentUser from "@/hooks/useCurrentUser";

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: "/auth",
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
}

/** 
Import Statements:
NextPageContext: Imported from Next.js, providing context information for server-side rendering.
getSession: Imported from next-auth/react, a function for retrieving the user session.

//? getServerSideProps Function:
//? This function is a special Next.js function used for server-side rendering. It is executed on the server every time a request is made to the page.

Retrieve User Session:
const session = await getSession(context);: Attempts to retrieve the user session using the getSession function. The context parameter is the context object provided by Next.js.

Check for Active Session:
if (!session) {: Checks if there is no active user session.
If there's no session, it returns a redirect configuration to send the user to the "/auth" page.
destination: "/auth": Specifies the destination URL for the redirect.
permanent: false: Indicates that this redirect is not permanent. A 302 status code will be used.

Return Props Object:
If there is an active session, it returns an empty props object.
This indicates that the page can be rendered, and the empty object will be available as props to the Home component.
*/

const images = [
    "/images/default-blue.png",
    "/images/default-red.png",
    "/images/default-slate.png",
    "/images/default-green.png",
];

interface UserCardProps {
    name: string;
}

const UserCard: React.FC<UserCardProps> = ({ name }) => {
    const imgSrc = images[Math.floor(Math.random() * 4)];

    return (
        <div className="group flex-row w-44 mx-auto">
            <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                <img
                    draggable={false}
                    className="w-max h-max object-contain"
                    src={imgSrc}
                    alt=""
                />
            </div>
            <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
                {name}
            </div>
        </div>
    );
};

const Profiles = () => {
    const router = useRouter();
    const { data: currentUser } = useCurrentUser();

    const selectProfile = useCallback(() => {
        router.push("/");
    }, [router]);

    return (
        <div className="flex items-center h-full justify-center">
            <div className="flex flex-col">
                <h1 className="text-3xl md:text-6xl text-white text-center">
                    Who&#39;s watching?
                </h1>
                <div className="flex items-center justify-center gap-8 mt-10">
                    <div onClick={() => selectProfile()}>
                        <UserCard name={currentUser?.name} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profiles;
