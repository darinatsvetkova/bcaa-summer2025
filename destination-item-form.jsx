import { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { DestinationListContext } from "./destination-list-provider.jsx";

function DestinationItemForm({ onClose }) {
  const { handlerMap } = useContext(DestinationListContext);
  const [formData, setFormData] = useState({
    name: "",
    arrivalDate: "",
    departureDate: "",
    description: ""
  });
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!formData.name) return setError("Please enter a destination name.");
    if (formData.departureDate < formData.arrivalDate) {
      return setError("Departure date must be later than or equal to arrival date.");
    }

    const result = await handlerMap.handleCreate(formData);
    if (result.ok) onClose();
    else setError(result.error.message);
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Destination</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Form.Group>
            <Form.Label>Destination Name</Form.Label>
            <Form.Control
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Arrival Date</Form.Label>
            <Form.Control
              type="date"
              value={formData.arrivalDate}
              onChange={(e) => setFormData({ ...formData, arrivalDate: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Departure Date</Form.Label>
            <Form.Control
              type="date"
              value={formData.departureDate}
              onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DestinationItemForm;
