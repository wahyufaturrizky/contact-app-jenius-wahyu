import React, { useContext, useEffect, useState } from "react";

import { Button, Col, Container, Form, FormGroup, Row } from "reactstrap";

// to compress image before uploading to the server

// configs for image resizing
//TODO: DONE add image configurations

// context stuffs
import { ContactContext } from "../context/Context";
import { CONTACT_TO_UPDATE } from "../context/action.types";

import { useHistory } from "react-router-dom";

import { toast } from "react-toastify";

import usericon from "../usericon.svg";

import blob1 from "../blob1.svg";
import blob2 from "../blob2.svg";

const AddContact = () => {
  // destructuring state and dispatch from context state
  const { state, dispatch } = useContext(ContactContext);

  const { contactToUpdate, contactToUpdateKey } = state;

  // history hooks from react router dom to send to different page
  const history = useHistory();

  // simple state of all component
  const [isUpdate, setIsUpdate] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [photo, setPhoto] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // when their is the contact to update in the Context state
  // then setting state with the value of the contact
  // will changes only when the contact to update changes
  useEffect(() => {
    if (contactToUpdate) {
      setFirstName(contactToUpdate.firstName);
      setLastName(contactToUpdate.lastName);
      setAge(contactToUpdate.age);
      setPhoto(contactToUpdate.photo);

      // also setting is update to true to make the update action instead the addContact action
      setIsUpdate(true);
    }
  }, [contactToUpdate]);

  // To upload image to firebase and then set the the image link in the state of the app
  const imagePicker = async (e) => {
    let url = e.target.value;
    let ext = url.substring(url.lastIndexOf(".") + 1).toLowerCase();

    if (
      e.target.files &&
      e.target.files[0] &&
      (ext === "gif" || ext === "png" || ext === "jpeg" || ext === "jpg")
    ) {
      let reader = new FileReader();

      reader.readAsDataURL(e.target.files[0]);

      reader.onload = function (e) {
        setPhoto(reader.result);
      };
    }
  };

  // setting contact to firebase DB
  const addContact = async () => {
    setIsLoading(true);
    const payload = {
      firstName,
      lastName,
      age,
      photo,
    };

    const contactsRef = await fetch(`${process.env.REACT_APP_BASE_URL}/contact`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await contactsRef;

    if (res.ok) {
      setIsLoading(false);
      toast("Contacts Created", { type: "success" });

      dispatch({
        type: CONTACT_TO_UPDATE,
        payload: null,
        key: null,
      });

      history.push("/");
    } else {
      setIsLoading(false);
      toast(res?.statusText, { type: "error" });

      dispatch({
        type: CONTACT_TO_UPDATE,
        payload: null,
        key: null,
      });

      history.push("/");
    }
  };

  // to handle update the contact when there is contact in state and the user had came from clicking the contact update icon
  const updateContact = async () => {
    setIsLoading(true);
    //TODO: update contact method
    const payload = {
      firstName,
      lastName,
      age,
      photo,
    };

    const contactsRef = await fetch(
      `${process.env.REACT_APP_BASE_URL}/contact/${contactToUpdateKey}`,
      {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const res = await contactsRef;

    if (res.ok) {
      setIsLoading(false);
      toast("Contacts Updated", { type: "success" });

      dispatch({
        type: CONTACT_TO_UPDATE,
        payload: null,
        key: null,
      });

      history.push("/");
    } else {
      setIsLoading(false);
      toast(res?.statusText, { type: "error" });

      dispatch({
        type: CONTACT_TO_UPDATE,
        payload: null,
        key: null,
      });

      history.push("/");
    }
  };

  // firing when the user click on submit button or the form has been submitted
  const handleSubmit = (e) => {
    e.preventDefault();
    isUpdate ? updateContact() : addContact();
  };

  // return the spinner when the image has been added in the storage
  // showing the update / add contact based on the  state
  return (
    <Container fluid className="mt-5 ">
      <img src={blob1} alt="blob1" className="cirlce6" />
      <img src={blob2} alt="blob2" className="cirlce7" />
      <Row>
        <Col md="8" className="offset-md-2 p-3 ">
          <Form className="formcard mb-5" onSubmit={handleSubmit}>
            <div className="text-center">
              <div className="">
                <label htmlFor="imagepicker" className="">
                  <img
                    src={
                      photo &&
                      !photo.includes("file") &&
                      (photo.includes("http") || photo.includes("data:image"))
                        ? photo
                        : usericon
                    }
                    alt=""
                    className="profile"
                  />
                </label>
                <input
                  type="file"
                  name="image"
                  id="imagepicker"
                  accept="image/*"
                  multiple={false}
                  onChange={(e) => imagePicker(e)}
                  className="hidden"
                />
              </div>
            </div>

            <FormGroup className="mt-4">
              <input
                className="input"
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </FormGroup>

            <FormGroup className="mt-4">
              <input
                className="input"
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <input
                className="input mt-2 mb-2"
                type="number"
                name="age"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Age"
              />
            </FormGroup>

            <Button
              type="submit"
              color="primary"
              disabled={isLoading}
              block
              className="text-uppercase button mt-5"
              style={{
                padding: "15px",
                fontSize: "18px",
              }}
            >
              {isLoading ? "Loading..." : isUpdate ? "Update Contact" : "Add Contact"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddContact;
