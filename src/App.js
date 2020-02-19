import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import Login from "./components/Login";
import Users from "./components/Users";
import Sales from "./components/Sales";
import History from "./components/History";
import Products from "./components/Products";
import Categories from "./components/Categories";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/login" render={props => <Login {...props} />} />
          <Route exact path="/" render={props => <Sales {...props} />} />
          <Route
            exact
            path="/search/:search"
            render={props => <Sales {...props} />}
          />
          <Route
            exact
            path="/history"
            render={props => <History {...props} />}
          />
          <Route
            exact
            path="/products/:page"
            render={props => <Products {...props} />}
          />
          <Route
            exact
            path="/categories"
            render={props => <Categories {...props} />}
          />
          <Route exact path="/users" render={props => <Users {...props} />} />
          <Route render={props => <Login {...props} />} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
