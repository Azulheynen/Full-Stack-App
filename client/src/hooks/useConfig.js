import { useEffect, useState } from "react";

const useConfig = () => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch("http://localhost:3500/config");
        const data = await response.json();
        setConfig(data.credentials);
      } catch (error) {
        console.error("Error fetching config:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  return { config, loading };
};

export default useConfig;
