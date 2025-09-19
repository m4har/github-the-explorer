import { useQuery } from "@tanstack/react-query";
import { getUserRepositories, searchUsers } from "./api";

interface UseSearchUsersProps {
  query: string;
}
export const useSearchUsers = ({ query }: UseSearchUsersProps) => {
  return useQuery({
    queryKey: ["users", query],
    queryFn: () => searchUsers(query),
    enabled: !!query,
  });
};

export const useUserRepositories = ({ username }: { username: string }) => {
  return useQuery({
    queryKey: ["repositories", username],
    queryFn: () => getUserRepositories(username),
  });
};
