// src/destination/destination-list.jsx
import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import DestinationListContent from "./destination-list-content.jsx";
import DestinationItemForm from "./destination-item-form.jsx";
import DestinationItemDeleteDialog from "./destination-item-delete-dialog.jsx";
import { DestinationListContext } from "./destination-list-provider.jsx";

function DestinationList() {
  const { data, handlerMap } = useContext(DestinationListContext);
  const [showForm, setShowForm] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(null);

  return (
    <div className="container mt-4">
      <h3>Travel Planner</h3>

      <Button className="my-3" onClick={() => setShowForm(true)}>
        Add Destination
      </Button>

      {showForm && (
        <DestinationItemForm
          onSubmit={async (formData) => {
            await handlerMap.handleCreate(formData);
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      <DestinationListContent
        destinations={data}
        onDelete={(dest) => setDeleteDialog(dest)}
        onAddActivity={handlerMap.handleAddActivity}
      />

      {deleteDialog && (
        <DestinationItemDeleteDialog
          data={deleteDialog}
          onClose={() => setDeleteDialog(null)}
        />
      )}
    </div>
  );
}

export default DestinationList;
