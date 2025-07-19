import React from "react";
import { useAuth } from "@/hooks/use-auth";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireHR?: boolean;
  requireEmployee?: boolean;
}

export default function ProtectedRoute({
  children,
  requireHR = false,
  requireEmployee = false,
}: ProtectedRouteProps) {
  const { isAuthenticated, isHR, isEmployee } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireHR && !isHR) {
    return <Navigate to="/dashboard" replace />;
  }

  if (requireEmployee && !isEmployee) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
