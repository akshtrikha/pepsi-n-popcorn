import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useMovie = (id?: string) => {
    const { data, error, isLoading } = useSWR(id ? `/api/movies/${id}` : null, fetcher, {
        revalidateIfStale: true,
        revalidateOnFocus: true,
        revalidateOnReconnect: true
    });

    console.log("useMovies:", id, data)

    return {
        data: data,
        error: error,
        isLoading: isLoading
    }
}

export default useMovie;