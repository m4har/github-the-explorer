"use client";

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSearchUsers } from "@/module/github-api/hooks";
import { useState } from "react";
import { UserRepo } from "./_components/user-repo";

export default function Home() {
  const [searchUser, setSearchUser] = useState("");
  const [submitSearch, setSubmitSearch] = useState("");
  const { data, isFetching } = useSearchUsers({ query: submitSearch });
  const userList = data || [];
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Card className="w-full max-w-sm" data-testid="app-home-card">
        <CardHeader>
          <Input
            data-testid="app-home-search-input"
            placeholder="Search Username"
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
          />
          <Button
            className="bg-blue-400 hover:bg-blue-500"
            data-testid="app-home-search-btn"
            onClick={() => setSubmitSearch(searchUser)}
          >
            Search
          </Button>
        </CardHeader>
        <CardContent>
          {isFetching ? (
            <p data-testid="app-home-loading-text">Loading...</p>
          ) : (
            <Accordion
              type="single"
              collapsible
              className="w-full"
              data-testid="app-home-accordion"
            >
              {userList.map((user) => (
                <UserRepo key={user.id} user={user} />
              ))}
            </Accordion>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
