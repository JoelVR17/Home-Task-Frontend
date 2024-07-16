import { getUser } from "@/api/AuthAPI";
import { useQuery } from "@tanstack/react-query";

// Return the logged user
export const useAuth = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["User"],
    queryFn: getUser,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return { data, isError, isLoading };
};
