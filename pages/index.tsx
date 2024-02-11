// import MyPage from "./test"

import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import useMovieList from "@/hooks/useMovieList";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";
import MovieList from "@/components/MovieList";
import InfoModal from "@/components/InfoModal";

export async function getServerSideProps(context: NextPageContext) {
    console.log("Running getServerSideProps");
    const session = await getSession(context);
    console.log("session: ", session);

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

export default function Home() {
    // const { data: user } = useCurrentUser();
    const { data: movies } = useMovieList();

    return (
        <>
            <InfoModal onClose={() => {}} />
            <Navbar />
            <Billboard />
            <div className="pb-40">
                <MovieList data={movies} title="Trending Now" />
            </div>
        </>
    );
}
