import { useEffect, useState } from "react";
import axios from "./axios";
import useUserStore from "../app/user";

const useAppDataFetch = () => {
  const { user, root } = useUserStore();
  const [appData, setAppData] = useState([]);
  const [isAppLoaded, setIsAppLoaded] = useState(false);

  // Define the fetchData function for tasks
  const fetchAppData = async () => {
    try {
      const response = await axios.get("/api/app/");
      setIsAppLoaded(true);
      return response.data.items;
    } catch (error) {
      console.error("Error fetching App data:", error);
      setIsAppLoaded(true);
      return [];
    }
  };

  useEffect(() => {
    // Fetch task data
    if (user?.Status === "Active")
      fetchAppData().then((AppInitialData) => {
        setAppData(AppInitialData);
      });
    else setIsAppLoaded(true);
  }, [user]);

  // Return an object containing all the fetched data
  return {
    appData,
    isAppLoaded,
  };
};

export default useAppDataFetch;
