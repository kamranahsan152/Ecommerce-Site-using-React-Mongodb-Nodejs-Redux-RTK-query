import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReactNode } from "react"; // Import ReactNode type
import { RootState } from "../../redux/store";

interface PrivateRouteProps {
  requiredRole?: string;
  children: ReactNode;
}

const ClientPrivateRoute: FC<PrivateRouteProps> = ({
  requiredRole,
  children,
}) => {
  const { isAuthenticated, role } = useSelector(
    (state: RootState) => state.user
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/401" />;
  }

  return <>{children}</>;
};

export default ClientPrivateRoute;
