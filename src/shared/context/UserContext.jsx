import React, { useCallback, useEffect, useState } from "react";
import { useAxios } from "../hooks/useAxios";
export const UserContext = React.createContext(null);

export function UserProvider(props) {
  const [user, setUser] = useState({});
  const { json, error, callApi } = useAxios("GET");

  useEffect(() => {
    callApi("/api/users/verify");
  }, []);

  useEffect(() => {
    if (json && json.success) {
      setUser(json.data);
    } else if (!json || !json.success) {
      return error;
    }
  }, [verifyData]);

  const clearState = useCallback(() => {
    callApi("/api/users/logout");
    setUser({});
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        clearState,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
