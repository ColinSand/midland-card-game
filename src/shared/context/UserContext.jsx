import React, { useCallback, useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
export const UserContext = React.createContext(null);

export function UserProvider(props) {
  const [user, setUser] = useState({ username: "test" });
  const { json, error, apiCall } = useAxios("get");
  const [isHost, setIsHost] = useState(false);

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

  const hosting = useCallback(() => {
    setIsHost(this.user);
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        clearState,
        hosting,
        isHost,
        setIsHost,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
