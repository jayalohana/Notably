"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useConvexAuth } from "convex/react";

export const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth;

  return (
    <div className=" max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your ideas, Documents, and Plans. Unified. Welcome to
        <span className="underline"> Notably</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl">
        Notably is the connected workspace where <br />
        better, faster work happens.
      </h3>
      <Button>
        Enter Notably
        <ArrowRight />
      </Button>
    </div>
  );
};
