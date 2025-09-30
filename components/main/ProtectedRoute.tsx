"use client";

import { useRouter } from "next/navigation";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  // useEffect(() => {
  //   const jsonToken = localStorage.getItem("authToken");
  //   const token = jsonToken;
  //   // console.log(typeof token);
  //   // console.log(token);

  //   if (!token) {
  //     router.push("/login");
  //   } else {
  //     return;
  //   }
  // }, [router]);

  return <>{children}</>;
}
