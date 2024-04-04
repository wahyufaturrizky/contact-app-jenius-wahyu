import React, { useContext } from "react";
import { Col, Row } from "reactstrap";

// icons
import { FaRegStar, FaStar } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";

// context stuffs
//TODO: DONE import context and action: update and single_contact
import { ContactContext } from "../context/Context";
import { CONTACT_TO_UPDATE, SET_SINGLE_CONTACT } from "../context/action.types";

import { useHistory } from "react-router-dom";

import usericon from "../usericon.svg";

const Contact = ({ contact, contactKey }) => {
  //TODO: DONE destructuring dispatch from the context
  const { dispatch } = useContext(ContactContext);

  // history hooks to get history
  const history = useHistory();

  // to delete the contact when delete contact is clicked
  const deleteContact = async () => {
    //TODO: DONE create this method from api

    const contactsRef = await fetch(`https://contact.herokuapp.com/contact/${contactKey}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await contactsRef.json();
  };

  const updateImpContact = async () => {};

  // when the update icon/ pen ion is clicked
  const updateContact = () => {
    dispatch({
      type: CONTACT_TO_UPDATE,
      payload: contact,
      key: contactKey,
    });

    // and pushing to the add contact screen
    history.push("/contact/add");
  };

  // to view a single contact in the contact/view screen
  const viewSingleContact = (contact) => {
    // setting single contact in state
    //TODO: use dispatch to view single contact
    dispatch({
      type: SET_SINGLE_CONTACT,
      payload: contact,
    });

    // sending...
    history.push("/contact/view");
  };

  return (
    <>
      <Row>
        <Col md="1" className="d-flex justify-content-center align-items-center">
          <div className="icon" onClick={() => updateImpContact()}>
            {contact.star ? (
              <FaStar size={22} className=" text-white" />
            ) : (
              <FaRegStar size={26} className=" text-white" style={{ opacity: "65%" }} />
            )}
          </div>
        </Col>
        <Col md="2" className="d-flex justify-content-center align-items-center">
          <img
            src={
              contact.photo &&
              !contact.photo.includes("file") &&
              (contact.photo.includes("http") || contact.photo.includes("data:image"))
                ? contact.photo
                : usericon
            }
            alt=""
            className="img-circle profile"
          />
        </Col>
        <Col md="8" onClick={() => viewSingleContact(contact)}>
          <div className="name">{`${contact.firstName} ${contact.lastName}`}</div>

          <div className="phone" style={{ opacity: "80%" }}>
            Age:
          </div>
          <div className="mail" style={{ opacity: "50%" }}>
            {contact.age}
          </div>
        </Col>
        <Col md="1" className="d-flex justify-content-center align-items-center">
          <div className="iconbtn mr-4 ">
            <MdDelete
              onClick={() => deleteContact()}
              color="#FF6370"
              className=" icon"
              style={{ zIndex: "1" }}
            />
          </div>
          <div className="iconbtn mr-5" style={{ marginRight: "30px" }}>
            <MdEdit className="icon " color="#54eafe" onClick={() => updateContact()} />{" "}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Contact;
