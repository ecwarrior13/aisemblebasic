import { getAuthenticatedUser } from "@/action/users";
import LandingPage from "@/components/layout/LandingPage";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getAuthenticatedUser();

  if (user) {
    redirect("/dashboard");
  }

  return <LandingPage />;
}
