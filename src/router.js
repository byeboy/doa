import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import IndexPage from './routes/IndexPage';
import App from "./routes/App";
import Dashboard from "./routes/Dashboard";

import Notices from "./routes/Notices.js";

import Tasks from "./routes/Tasks.js";

import Branches from "./routes/Branches.js";

import Users from "./routes/Users.js";

import Warehouse from "./routes/Warehouse.js";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Dashboard} />
        <Route path="dashboard" component={Dashboard} />
        <Route path="notices" component={Notices} />
        <Route path="tasks" component={Tasks} />
        <Route path="branches" component={Branches} />
        <Route path="users" component={Users} />
      	<Route path="warehouse" component={Warehouse} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
