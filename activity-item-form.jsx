// src/activity/activity-item-form.jsx

import { useContext, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { DestinationListContext } from "../destination/destination-list-provider";

function ActivityItemForm({ onClose, destinationId }) {
  const { handlerMap } = useContext(DestinationListContext);

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    startTime: "",
    endTime: "",
    description: "",
  });

  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!formData.name) {
      setError("Please enter an activity name.");
      return;
    }
    const now = new Date().toISOString().split("T")[0];
    if (formData.date < now) {
      setError("The date must be today or in the future.");
      return;
    }
    if (formData.startTime >= formData.endTime) {
      setError("Start time must be before end time.");
      return;
    }

    const result = await handlerMap.handleCreateActivity(destinationId, formData);
    if (result.ok) {
      onClose();
    } else {
      setError(result.error?.message || "An error occurred");
    }
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Activity</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Form.Group>
          <Form.Label>Activity name*</Form.Label>
          <Form.Control
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Date*</Form.Label>
          <Form.Control
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Start Time*</Form.Label>
          <Form.Control
            type="time"
            value={formData.startTime}
            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>End Time*</Form.Label>
          <Form.Control
            type="time"
            value={formData.endTime}
            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ActivityItemForm;
