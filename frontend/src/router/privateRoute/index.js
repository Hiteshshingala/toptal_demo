import React, {useState, useEffect} from "react";
import isAuthenticated from "../../services/isAuthenticated";
import { Route, Redirect } from "react-router-dom";
import SideBar from "../../components/sidebar";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { getUserData } from '../../services/localStorage';


const PrivetRouter = ({ component: Component, ...rest }) => {
  const [isCompanyNameExist, setIsCompanyNameExist] = useState(false);

  useEffect(() => {
    checkCompanyNameExist();
  }, []);

  const checkCompanyNameExist = () => {
    let user = getUserData();
    user = user ? JSON.parse(user) : user;
    if (user && user.restaurantName) {
      setIsCompanyNameExist(true);
    } else {
      setIsCompanyNameExist(false);
    }
  };
  return(
  <Container fluid>
  <Row className="center">
    <Col xs={2} id="sidebar-wrapper">
      <SideBar isCompanyNameExist={isCompanyNameExist}/>
    </Col>
    <Col xs={10} id="page-content-wrapper">
    <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} checkCompanyNameExist={checkCompanyNameExist} isCompanyNameExist={isCompanyNameExist}/>
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

)};

export default PrivetRouter;