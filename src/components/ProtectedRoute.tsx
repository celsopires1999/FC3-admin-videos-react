import React from "react";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../features/auth/authSlice";
import { Navigate } from "react-router-dom";

type Props = { children: React.ReactNode };

export function ProtectedRoute({ children }: Props) {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
