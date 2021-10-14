import React, {useState, useEffect} from "react";
import "./index.css";
import { Nav } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { getUserData } from '../../services/localStorage';

function SideBar({isCompanyNameExist}) {
  const history = useHistory();
  if(isCompanyNameExist) {
    return (
      <Nav
      className="col-md-1 d-none d-md-block sidebar"
      activeKey="/dashboard"
      onSelect={(selectedKey) => {
        history.push(selectedKey);
        }}
        >
        <div className="sidebar-sticky"></div>
        <Nav.Item className="sidebar-options">
          <Nav.Link eventKey="/dashboard">Update Tables</Nav.Link>
        </Nav.Item>
        <Nav.Item className="sidebar-options">
          <Nav.Link eventKey="booktable">Book Table</Nav.Link>
        </Nav.Item>
        <Nav.Item className="sidebar-options">
          <Nav.Link eventKey="report">Report</Nav.Link>
        </Nav.Item>
      </Nav>
    );
  } else {
    return null;
  }
}

export default SideBar;
