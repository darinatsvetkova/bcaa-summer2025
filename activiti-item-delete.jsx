// src/activity/activity-item-delete-dialog.jsx

import { Modal, Button } from "react-bootstrap";

function ActivityItemDeleteDialog({ onClose, data, onDelete }) {
  const handleDelete = async () => {
    await onDelete(data);
    onClose();
  };

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Activity</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete the activity <strong>{data.name}</strong>?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ActivityItemDeleteDialog;
