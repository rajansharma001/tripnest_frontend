"use client";
import { useEffect } from "react";
import { useAuth } from "./authContext";
import { useRouter } from "next/navigation";

export const useProtectedRoute = (
  allowedRoles: string[] = [],
  redirectIfLoggedIn: boolean = false
) => {
  const router = useRouter();

  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    // Case 1: Redirect logged-in users away from auth pages
    if (redirectIfLoggedIn && user) {
      if (user.role === "admin") {
        router.replace("/admin/dashboard");
      } else if (user.role === "user") {
        router.replace("/user/dashboard");
      } else {
        router.replace("/");
      }
      return;
    }

    // Case 2: Protect restricted pages
    if (!redirectIfLoggedIn) {
      if (!user) {
        router.replace("/signin");
        return;
      }
      if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        router.replace("/unauthorized");
      }
    }
  }, [user, isLoading, allowedRoles, redirectIfLoggedIn, router]);
};
