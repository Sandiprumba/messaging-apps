import { Outlet, Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectRoute = ({ children, user, redirect = "/login" }) => {
  if (!user) return <Navigate to={redirect} />;
  return children ? children : <Outlet />;
};
// ProtectRoute.propTypes = {
//   children: PropTypes.node,
//   user: PropTypes.bool,
//   redirect: PropTypes.string,
// };

export default ProtectRoute;

//here children prop represents the content that is passed between the opening and closing tags of the protected route
