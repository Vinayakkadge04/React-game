import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "./index.css";
import axios from "axios";
import { URL } from "./utils/constants";
import { useDispatch } from "react-redux";
import { score } from "./component/userslice";

function NamePopUp(props) {
  const dispatch = useDispatch();
  const [show, setShow] = useState();
  const handleClose = () => setShow(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  async function EnterDetail() {
    try {
      const url = URL + "user";
      const response = await axios.post(url, {
        name: name,
        email:email
      });
      console.log(response.data.status);
      if (response.data.status === "success") {
        console.log(response.data.user);
        dispatch(score({user:response.data.user.name , nameEntered:true , id:response.data.user.id}))
        props.onHide();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Modal className="ashgdjas" {...props}>
        <Modal.Header>
          <Modal.Title>Enter Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="asjhwdq">
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name : </Form.Label>
              <Form.Control
                type="text"
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address :</Form.Label>
              <Form.Control
                type="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={EnterDetail}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NamePopUp;
