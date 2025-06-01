// src/destination/destination-list-content.jsx
import DestinationItem from "./destination-item.jsx";

function DestinationListContent({ destinations, onDelete, onAddActivity }) {
  if (destinations.length === 0) {
    return <p>No destinations planned. Start by adding one.</p>;
  }

  return (
    <div>
      {destinations.map((destination) => (
        <DestinationItem
          key={destination.id}
          destination={destination}
          onDelete={onDelete}
          onAddActivity={onAddActivity}
        />
      ))}
    </div>
  );
}

export default DestinationListContent;
