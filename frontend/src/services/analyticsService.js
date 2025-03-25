export const fetchVercelAnalytics = async () => {
    try {
      const response = await fetch(
        `https://api.vercel.com/v2/analytics/metrics/visits?projectId=${import.meta.env.VITE_VERCEL_PROJECT_ID}&from=2023-01-01&to=now`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_VERCEL_TOKEN}`
          }
        }
      );
  
      const data = await response.json();
      return data?.visits ?? 0;
    } catch (error) {
    //   console.error("Vercel Analytics Error:", error);
      return 0; // Fallback
    }
  };