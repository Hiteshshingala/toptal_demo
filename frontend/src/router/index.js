import React from "react";
import { Route, Switch } from "react-router-dom";

// import Login from "../components/auth/login";
import Login from "../components/auth/login";
import SignUP from "../components/auth/register";
import Dashboard from "../pages/dashboard";
import PrivetRouter from "./privateRoute";
// import NavBar from "../../common/navBar";
// import Footer from "../../common/footer/footer";

const Routers = () => (
  <>
    {/* <NavBar /> */}
    <Switch>
      <Route exact path="/" component={Login}></Route>
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/sign-up" component={SignUP}></Route>
      <PrivetRouter
        exact
        path="/dashboard"
        component={Dashboard}
      ></PrivetRouter>
    </Switch>
    {/* <Footer /> */}
  </>
);

export default Routers;