import React, { useCallback, useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
export const UserContext = React.createContext(null);

export function UserProvider(props) {
  const [user, setUser] = useState("");
  const { json, error, apiCall } = useAxios("get");
  const [isHost, setIsHost] = useState(null);

  useEffect(() => {
    apiCall("/api/users/verify");
  }, []);

  useEffect(() => {
    if (json && json.success) {
      setUser(json.data);
    }
  }, [json]);

  const clearState = useCallback(() => {
    apiCall("/api/users/logout");
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        clearState,
        isHost,
        setIsHost,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
