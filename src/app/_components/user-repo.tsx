"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useUserRepositories } from "@/module/github-api/hooks";
import { GitHubUser } from "@/module/github-api/types";
import { Star } from "lucide-react";

type Props = {
  user: GitHubUser;
};
export const UserRepo = ({ user }: Props) => {
  const { data, isFetching } = useUserRepositories({ username: user.login });
  const repoList = data || [];
  return (
    <AccordionItem
      value={user.id.toString()}
      data-testid={`user-repo-item-${user.id}`}
    >
      <AccordionTrigger
        className="bg-gray-200 px-2 my-2"
        data-testid={`user-repo-trigger-${user.id}`}
      >
        {user.login}
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-4 text-balance px-2 ml-4">
        {isFetching ? (
          <p data-testid={`user-repo-loading-${user.id}`}>Loading...</p>
        ) : (
          repoList.map((repo) => (
            <div
              key={repo.id}
              className="flex flex-col gap-2 bg-gray-300 p-2"
              data-testid={`user-repo-${repo.id}`}
            >
              <div className="flex justify-between">
                <span className="font-bold">{repo.name}</span>
                <span className="flex items-center gap-1">
                  {repo.stargazers_count}
                  <Star size={20} />
                </span>
              </div>
              <div>{repo.description}</div>
            </div>
          ))
        )}
      </AccordionContent>
    </AccordionItem>
  );
};
