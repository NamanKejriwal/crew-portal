import React from "react";
import { useAuth } from "@/hooks/use-auth";
import HRDashboard from "./HRDashboard";
import EmployeeDashboard from "./EmployeeDashboard";

export default function Dashboard() {
  const { isHR, isEmployee } = useAuth();

  if (isHR) {
    return <HRDashboard />;
  }

  if (isEmployee) {
    return <EmployeeDashboard />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
        <p className="text-gray-600">
          You don't have permission to access this dashboard.
        </p>
      </div>
    </div>
  );
}
