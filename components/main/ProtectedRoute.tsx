"use client";

import { BACKEND_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch(`${BACKEND_URL}/api/validate-token/`, {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`, // 👈 IMPORTANT
          },
        });

        if (!res.ok) {
          localStorage.removeItem("authToken");
          router.push("/login");
        }
      } catch (error) {
        console.error("Token validation failed:", error);
        localStorage.removeItem("authToken");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, [router]);

  if (loading) {
    return (
      <>
        {/* Always render children */}
        {children}

        {/* Overlay loader that disappears when loading = false */}
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
            <div className="flex flex-col items-center space-y-4">
              <PulseLoader color="#ffffff" size={12} />
              <span className="text-white text-lg">Checking session...</span>
            </div>
          </div>
        )}
      </>
    );
  }

  return <>{children}</>;
}
