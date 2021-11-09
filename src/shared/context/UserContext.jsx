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
    }
  }, [json]);

  const clearState = useCallback(() => {
    callApi("/api/users/logout");
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
