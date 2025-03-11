import LandingPage from "@/components/layout/LandingPage";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();

  /*
  if (userId) {
    redirect("/dashboard");
  }
*/
  return <LandingPage />;
}
