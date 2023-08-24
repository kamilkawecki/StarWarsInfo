import { useCallback } from "react";

const useHttp = () => {
  const sendRequest = useCallback(
    async (url, options) => {
      const response = await fetch(url, options);
      return await response.json();
    },
    []
  );

  return {
    sendRequest: sendRequest,
  };
};

export default useHttp;
