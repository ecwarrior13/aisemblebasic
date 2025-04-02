"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { waitFor } from "@/lib/waitFor";

export default function AccessDeniedWithRedirect({ redirectPath = "/" }) {
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const handleRedirect = async () => {
      await waitFor(5000);
      if (isMounted) {
        router.push(redirectPath);
      }
    };

    handleRedirect();

    // Cleanup function to prevent redirect if component unmounts
    return () => {
      isMounted = false;
    };
  }, [router, redirectPath]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
      <p>You do not have permission to view this page.</p>
      <p className="mt-4 text-sm text-gray-500">
        Redirecting you in 5 seconds...
      </p>
    </div>
  );
}
