import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
export const UserContext = React.createContext(null);

export function UserProvider(props) {
  const [user, setUser] = useState({});

  useEffect(() => {
    async function verify() {
      try {
        const { data: json } = await axios.get("/api/users/verify");
        if (json.success) {
          setUser(json.data);
        }
      } catch (e) {}
    }
    verify();
  }, []);

  const clearState = useCallback(async () => {
    try {
      await axios.get("/api/users/logout");
      setUser({});
    } catch (e) {}
  }, [setUser]);

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
