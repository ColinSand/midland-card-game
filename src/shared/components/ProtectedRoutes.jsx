import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { UserContext } from "../context/UserContext";

function ProtectedRoutes({ children, path, shielded }) {
  const { user } = useContext(UserContext);
  const redirectTo = useMemo(() => (shielded ? "/login" : "/home"), [shielded]);

  if ((user.username && shielded) || (!user.username && !shielded)) {
    return <Route path={path}>{children}</Route>;
  } else {
    return (
      <Route path={path}>
        <Redirect to={redirectTo}></Redirect>
      </Route>
    );
  }
}
export default ProtectedRoutes;
