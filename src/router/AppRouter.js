import React from "react";
import { connect } from "react-redux";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Login from '../components/Login';
import Register from '../components/Register';

{/* Browser Router is router 
    that makes use of the 
    HTML5 history API (pushState, replaceState, popstate event) to keep your UI in sync with URL
    https://reactrouter.com/web/api/BrowserRouter
*/}

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route path="/" component={Login} exact={true} />
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => ({
    authentication: state.authentication
});

export default connect(mapStateToProps)(AppRouter);
