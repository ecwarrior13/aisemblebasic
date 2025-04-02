import { requireAuth } from "@/action/users";

import React from "react";
import AdminModelsPage from "./_component/models";
import AccessDeniedWithRedirect from "./_component/AccessDeniedWithRedirect";

async function AdminPage() {
  const ADMIN_USER_ID = process.env.ADMIN_USER_ID;

  const user = await requireAuth();

  if (user.id !== ADMIN_USER_ID) {
    return <AccessDeniedWithRedirect redirectPath="/dashboard" />;
  }

  return (
    <div>
      <AdminModelsPage />
    </div>
  );
}

export default AdminPage;
