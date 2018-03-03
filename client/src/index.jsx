import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import App from './components/app.jsx';
import Create from './components/create.jsx';
import Login from './components/login.jsx';
import Post from './components/post.jsx';
import Signup from './components/signup.jsx';
import AppSecure from './components/appSecure.jsx';
import MyJobs from './components/myjobs.jsx';
import PostSecure from './components/postSecure.jsx';

ReactDOM.render(
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/secure" component={AppSecure} />
        <Route exact path="/job/create" component={Create}/>
        <Route exact path="/loginPage" component={Login}/>
        <Route exact path="/signupPage" component={Signup}/>
        <Route exact path="/my/jobs" component={MyJobs}/>
        <Route exact path="/posts" component={Post} />
        <Route path="/posts/secure" component={PostSecure} />
      </Switch>
    </div>
  </Router>,
  document.getElementById('app')
);
