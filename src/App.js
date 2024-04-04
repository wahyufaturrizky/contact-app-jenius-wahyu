import React, { useEffect, useReducer } from "react";

import { Container } from "reactstrap";

// react-router-dom3
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

// react toastify stuffs
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// components
import Header from "./layout/Header";
import AddContact from "./pages/AddContact";
import Contacts from "./pages/Contacts";
import PageNotFound from "./pages/PageNotFound";
import ViewContact from "./pages/ViewContact";

// context api stuffs
//TODO: DONE  import reducers and contexts
import { ContactContext } from "./context/Context";
import { SET_CONTACT, SET_LOADING } from "./context/action.types";
import reducer from "./context/reducer";

// first state to provide in react reducer
const initialState = {
  contacts: [],
  contact: {},
  contactToUpdate: null,
  contactToUpdateKey: null,
  isLoading: false,
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // will get contacts from api and set it on state contacts array
  const getContacts = async () => {
    // TODO: load existing data
    dispatch({
      type: SET_LOADING,
      payload: true,
    });

    const contactsRef = await fetch(`https://contact.herokuapp.com/contact`);

    const res = await contactsRef.json();

    dispatch({
      type: SET_CONTACT,
      payload: res?.data,
    });

    dispatch({
      type: SET_LOADING,
      payload: false,
    });
  };

  // getting contact  when component did mount
  useEffect(() => {
    getContacts();
  }, []);

  return (
    <Router>
      <ContactContext.Provider value={{ state, dispatch }}>
        <ToastContainer theme="dark" />
        <Header />
        <Container>
          <Switch>
            <Route exact path="/contact/add" component={AddContact} />
            <Route exact path="/contact/view" component={ViewContact} />
            <Route exact path="/" component={Contacts} />
            <Route exact path="*" component={PageNotFound} />
          </Switch>
        </Container>
      </ContactContext.Provider>
    </Router>
  );
};

export default App;
