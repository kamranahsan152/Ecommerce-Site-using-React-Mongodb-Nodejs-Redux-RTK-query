import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReactNode } from "react";
import { RootState } from "../../redux/store";

interface Props {
  children: ReactNode;
}

const PublicRoute: React.FC<Props> = ({ children }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.admin.isAuthenticated
  );

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
};

export default PublicRoute;
