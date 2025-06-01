import { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { DestinationListContext } from "./destination-list-provider.jsx";

function DestinationItemDeleteDialog({ data, onClose }) {
  const [errorState, setErrorState] = useState();
  const { state, handlerMap } = useContext(DestinationListContext);

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Destination</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!!errorState?.message ? (
          <Alert variant="danger">{errorState.message}</Alert>
        ) : null}
        Are you sure that you want to delete destination and all its activities?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={state === "pending"}>
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={async () => {
            const result = await handlerMap.handleDelete({ id: data.id });
            if (result.ok) {
              onClose();
            } else {
              setErrorState(result.error);
            }
          }}
          disabled={state === "pending"}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DestinationItemDeleteDialog;
