import React, { useContext, useMemo } from "react";
import { Navigate, Route } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function ProtectedRoutes({ children, path, shielded }) {
  const { user } = useContext(UserContext);
  const redirectTo = useMemo(() => (shielded ? "/login" : "/home"), [shielded]);

  if ((user.username && shielded) || (!user.username && !shielded)) {
    return <Route path={path}>{children}</Route>;
  } else {
    return (
      <Route path={path}>
        <Navigate to={redirectTo}></Navigate>
      </Route>
    );
  }
}
export default ProtectedRoutes;
