// src/activity/activity-list-provider.jsx

import { createContext, useEffect, useState } from "react";
import { fetchDestinations } from "../fetch-helper";

export const ActivityListContext = createContext();

export function ActivityListProvider({ children }) {
  const [activities, setActivities] = useState([]);
  const [state, setState] = useState("ready");

  async function load() {
    setState("pending");
    const result = await fetchDestinations(); 
    if (result.ok) {
      const allActivities = result.data.flatMap(dest => 
        dest.activityList.map(act => ({ ...act, destinationName: dest.name }))
      );
      setActivities(allActivities);
      setState("ready");
    } else {
      setState("error");
    }
  }

  useEffect(() => {
    load();
  }, []);

  const value = {
    data: activities,
    state,
    reload: load,
  };

  return (
    <ActivityListContext.Provider value={value}>
      {children}
    </ActivityListContext.Provider>
  );
}
