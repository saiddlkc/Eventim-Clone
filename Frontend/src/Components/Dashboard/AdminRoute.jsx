import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

const AdminRoute = ({ children }) => {
  const { user } = useAuthContext();

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminRoute;
