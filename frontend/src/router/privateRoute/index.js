import React from "react";
import isAuthenticated from "../../services/isAuthenticated";
import { Route, Redirect } from "react-router-dom";
import SideBar from "../../components/sidebar";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

const PrivetRouter = ({ component: Component, ...rest }) => (
  <Container fluid>
  <Row className="center">
    <Col xs={2} id="sidebar-wrapper">
      <SideBar />
    </Col>
    <Col xs={12} id="page-content-wrapper">
    <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      )
    }
  />
    </Col>
  </Row>
</Container>

);

export default PrivetRouter;