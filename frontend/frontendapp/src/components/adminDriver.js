import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import logo from "../assets/logo.png";
import axios from "axios";
import { Table } from "rsuite";

const adminDriver = () => {
  return (
    <div>
      <p>adminDriver</p>
    </div>
  );
};
export default adminDriver;
