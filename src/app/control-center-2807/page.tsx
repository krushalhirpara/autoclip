import { redirect } from "next/navigation";
import { getAdminSession } from "@/server/auth/admin-auth";

export default async function ControlCenterRootPage() {
  const session = await getAdminSession();
  if (session) {
    redirect("/control-center-2807/dashboard");
  } else {
    redirect("/control-center-2807/login");
  }
}
