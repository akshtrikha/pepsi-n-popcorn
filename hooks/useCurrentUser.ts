import useSWR from "swr";

import fetcher from "@/lib/fetcher"

const useCurrentUser = () => {
    const {data, error, isLoading, mutate} = useSWR('/api/current', fetcher);

    return {
        data,
        error,
        isLoading,
        mutate,
    }
}

export default useCurrentUser;

/*

Implementing the useCurrentUser custom hook with the useSWR hook offers several benefits in a React application:

Abstraction and Reusability:
Encapsulating the logic for fetching current user data within a custom hook promotes code abstraction and reusability. The logic for data fetching is isolated and can be easily reused in multiple components.

Consistent Data Handling:
The custom hook provides a consistent interface for handling data-related states (data, error, loading) across different components. This promotes a standardized approach to dealing with asynchronous operations.

Simplified Component Code:
Components using useCurrentUser can be more concise and focused on rendering, as the data fetching logic is abstracted away. This leads to cleaner and more maintainable component code.

Automatic Caching and State Management:
The useSWR hook automatically handles caching of fetched data and efficiently manages the state of the data (loading, error, etc.). This simplifies state management and helps avoid unnecessary network requests.

Manual Data Revalidation:
The exposed mutate function allows manual triggering of data revalidation. This is useful for scenarios where you want to update the data in response to user interactions or other events without requiring a full page reload.

Integration with swr Features:
Utilizing useSWR allows leveraging additional features provided by the swr library, such as the "stale-while-revalidate" strategy, polling, and global configuration options.

Improved Testing:
Abstracting data fetching into a custom hook facilitates unit testing. You can more easily test the hook's behavior in isolation, promoting a testable and reliable codebase.

*/