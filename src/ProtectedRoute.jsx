import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const role = useSelector((state) => state.userReducer.account.role); // Lấy role từ Redux

  // Nếu vai trò không nằm trong danh sách được phép, chuyển hướng đến trang login
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  // Nếu vai trò hợp lệ, render component
  return children;
};

export default ProtectedRoute;
