import React, { useContext, useMemo } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function ProtectedRoutes({ children, shielded }) {
  const { user } = useContext(UserContext);
  const redirectTo = useMemo(() => (shielded ? "/login" : "/home"), [shielded]);

  if ((user.username && shielded) || (!user.username && !shielded)) {
    return <>{children}</>;
  } else {
    return <Navigate to={redirectTo}></Navigate>;
  }
}
export default ProtectedRoutes;
