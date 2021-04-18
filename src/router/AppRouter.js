import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import LoginScreen from "../components/auth/LoginScreen";
import CalendarScreen from "../components/calendar/CalendarScreen";
import { startChecking } from "../actions/auth.js";
import { useDispatch, useSelector } from "react-redux";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Spinner from "../components/auth/Spinner";

const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (checking) {
    return (
      <div className="container-spinner">
        <Spinner />
      </div>
    );
  }
  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            exact
            path={"/login"}
            component={LoginScreen}
            isAuthenticaded={!!uid}
          />
          <PrivateRoute
            exact
            path={"/"}
            component={CalendarScreen}
            isAuthenticaded={!!uid}
          />

          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
