import React, { useEffect, useState } from "react";
import "./driver.css";
import TodoItem from "./listItem";
import axios from "axios";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";
import logo from "../assets/logo.png";

/**
 * @param {boolean} logout - check status of logout clicked
 * @param {array} todos - list of task to be completed by driver
 * @param {cookies} token - create and authenticate session
 * @param {boolean} isOpen - use to toggle between options
 *
 */
/**
 * Driver function gets all the task needed to be completed by driver logged in from backend and
 * shows in user inteface as todo list along with delete button to clear completed task
 */
function Driver() {
  const [logout, setLogout] = useState(false);
  const [todos, setTodos] = useState([]);
  const [token, setToken, deleteToken] = useCookies(["mr-token"]);
  const [isOpen, setIsOpen] = useState(false);

  /**
   * logoutClicked logs out user and clears token.
   */
  const logoutClicked = () => {
    deleteToken(["mr-token"]);
    setLogout(true);
    //console.log(logout);
  };

  useEffect(() => {
    // Run! Like go get some data from an API.
    if (logout == false && token["mr-token"]) {
      axios
        .get("/getTask", {
          headers: { Authorization: `Bearer ${token["mr-token"]}` },
        })
        .then((response) => {
          console.log(response);
          setTodos(response.data.path);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      window.location.href = "/";
    }
  }, [logout, token]);

  /**
   *
   * Deletes a task from todo list and updates the new list.
   */
  const deleteItem = (addr) => {
    setTodos(todos.filter((item) => item.address !== addr));

    axios
      .post(
        "/updateDriverLocation",
        { current_location: addr },
        { headers: { Authorization: `Bearer ${token["mr-token"]}` } }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="app">
      <Navbar color="light" light expand="md">
        <NavbarBrand style={{ color: "green" }} href="#">
          <img src={logo} width="30" height="30" />
          PickBins
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle style={{ color: "green" }} nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu style={{ color: "green" }} right>
                <DropdownItem style={{ color: "green" }}>Contacts</DropdownItem>
                <DropdownItem style={{ color: "green" }}>About</DropdownItem>
                <DropdownItem divider />
                <DropdownItem style={{ color: "red" }}>Help</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Button
            style={{ color: "red", backgroundColor: "white" }}
            onClick={logoutClicked}
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            Logout
          </Button>
        </Collapse>
      </Navbar>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="todo-list" style={{ flex: 1 }}>
          <h1 style={{ color: "green" }}>Pickup Locations List</h1>
          <p
            style={{
              flex: 0.1,
            }}
          ></p>
          {todos.map((todo, index) => (
            <TodoItem
              key={index}
              index={index}
              todo={todo}
              deleteItem={() => deleteItem(todo.address)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Driver;
