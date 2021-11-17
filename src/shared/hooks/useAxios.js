import { useCallback, useState } from "react";
import axios from "axios";

export default function useAxios(method) {
  const [json, setJson] = useState(null);
  const [error, setError] = useState(null);

  const apiCall = useCallback(
    async (url, body = null) => {
      if (!url || (method === "post" && !body)) {
        return;
      }
      setJson(null);
      setError(null);
      try {
        const response = await axios[method](url, body);
        if (response.data.error) {
          setError(response.data.error);
          return;
        }
        setJson(response.data);
      } catch (e) {
        setError("Something went wrong, please try again later");
      }
    },
    [method]
  );

  return { json, error, apiCall };
}
