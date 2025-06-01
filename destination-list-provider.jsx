// src/destination/destination-list-provider.jsx
import { createContext, useEffect, useState } from "react";
import { fetchDestinations, createDestination, deleteDestination, addActivityToDestination } from "../fetch-helper.js";

export const DestinationListContext = createContext();

function DestinationListProvider({ children }) {
  const [data, setData] = useState([]);
  const [state, setState] = useState("ready");

  // Load destinations
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setState("pending");
    try {
      const result = await fetchDestinations();
      setData(result);
      setState("ready");
    } catch (err) {
      setState("error");
    }
  }

  const handlerMap = {
    async handleCreate(destination) {
      const created = await createDestination(destination);
      setData((prev) => [...prev, created]);
      return { ok: true };
    },

    async handleDelete({ id }) {
      try {
        await deleteDestination(id);
        setData((prev) => prev.filter((item) => item.id !== id));
        return { ok: true };
      } catch (error) {
        return { ok: false, error };
      }
    },

    async handleAddActivity(destinationId, activity) {
      try {
        const updated = await addActivityToDestination(destinationId, activity);
        setData((prev) =>
          prev.map((dest) =>
            dest.id === destinationId ? { ...dest, activities: [...dest.activities, updated] } : dest
          )
        );
        return { ok: true };
      } catch (error) {
        return { ok: false, error };
      }
    },
  };

  return (
    <DestinationListContext.Provider value={{ data, state, handlerMap }}>
      {children}
    </DestinationListContext.Provider>
  );
}

export default DestinationListProvider;
