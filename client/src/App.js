import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Main from "./pages/Main/Main";
import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/EditProfile/EditProfile";
import CreatePost from "./pages/CreatePost/CreatePost";
import Navbar from "./components/Navbar/Navbar";
import PrivateRoute from "./components/Routing/PrivateRoute";
import "./App.css";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <PrivateRoute exact path="/" component={Main} />
          {/* <Route exact path="/" component={Main} /> */}
          <Route exact path="/:username" component={Profile} />
          <PrivateRoute
            exact
            path="/:username/create-post"
            component={CreatePost}
          />
          <PrivateRoute exact path="/account/edit" component={EditProfile} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;

// edit profile
//
