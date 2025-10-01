"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const jsonToken = localStorage.getItem("authToken");
    const token = jsonToken;
    // console.log(typeof token);
    // console.log(token);

    // Check if the token is good

    if (!token) {
      router.push("/login");
    } else {
      return;
    }
  }, [router]);

  return <>{children}</>;
}
