import React from 'react'
import './index.css'
import {Nav} from "react-bootstrap";
import { useHistory } from 'react-router-dom';

function SideBar(props) {
    const history = useHistory();

    return (
        <Nav className="col-md-1 d-none d-md-block bg-light sidebar"
        activeKey="/dashboard"
        onSelect={selectedKey => {
             history.push(selectedKey)
        }}
        >
            <div className="sidebar-sticky"></div>
        <Nav.Item>
            <Nav.Link eventKey="/dashboard">Tables</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey="booktable">Book Table</Nav.Link>
        </Nav.Item>
        </Nav>
    )
}

export default SideBar
