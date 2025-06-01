// src/destination/destination-list-content.jsx

import { useContext } from "react";
import DestinationItem from "./destination-item.jsx";
import { DestinationListContext } from "./destination-list-provider.jsx";
import Button from "react-bootstrap/Button";

function DestinationListContent() {
  const { destinationList, handlerMap } = useContext(DestinationListContext);

  if (!destinationList || destinationList.length === 0) {
    return <p>No destinations planned. Start by adding one.</p>;
  }

  return (
    <div>
      {destinationList.map((destination) => (
        <DestinationItem
          key={destination.id}
          data={destination}
          onEdit={handlerMap.openEditForm}
          onDelete={handlerMap.openDeleteDialog}
        />
      ))}
    </div>
  );
}

export default DestinationListContent;
