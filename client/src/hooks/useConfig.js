// src/hooks/useConfig.js
import { useEffect, useState } from "react";

const useConfig = () => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch("/api/config/credentials"); // Adjust the endpoint if necessary
        const data = await response.json();
        setConfig(data.credentials); // Adjust based on your API response
      } catch (error) {
        console.error("Failed to fetch config:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  return { config, loading };
};

export default useConfig;
