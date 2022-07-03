import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const currentUser = useSelector((state) => state.userReducer);
  if (!currentUser) {
    return <Navigate to="/" />;
  }
  return children;
};
export default ProtectedRoute;
