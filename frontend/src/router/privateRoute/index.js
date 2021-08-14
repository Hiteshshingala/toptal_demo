import React from "react";
import isAuthenticated from "../../services/isAuthenticated";
import { Route, Redirect } from "react-router-dom";

const PrivetRouter = ({ component: Component, ...rest }) => (
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
);

export default PrivetRouter;