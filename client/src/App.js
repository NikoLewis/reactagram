import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import './App.css';
import axios from 'axios';

import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import SinglePost from './components/SinglePost';
import AddComment from './components/addcomment';
import ShowComments from './components/ShowComments';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 1,
      userData: {},
      postsData: ''
    };
  }

  grabUserObj() {
    axios({
      url: `http://localhost:3000/api/reactagram/users/${this.state.id}`,
      method: 'get'
    }).then(response => {
      console.log(response.data);
      this.setState({ userData: response.data });
    });
  }

  queryPosts() {
    axios({
      url: 'http://localhost:3000/api/reactagram/posts',
      method: 'get'
    }).then(response => {
      console.log(response.data);
      this.setState({ postsData: response.data });
    });
  }

  componentDidMount() {
    this.queryPosts(), this.grabUserObj();
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Redirect to="/reactagram" />}
            />

            {/********************** ON HOLD SECTION **********************/}
            {/********************** LOGIN AND SIGNUP *********************/}
            <Route
              exact
              path="/login"
              render={props => {
                return (
                  <div>
                    <div id="reactagram-logo" />
                    <LandingPage />
                    <Login />
                  </div>
                );
              }}
            />

            <Route
              exact
              path="/signup"
              render={props => {
                return <Signup />;
              }}
            />

            {/************************* LANDING PAGE ************************/}
            {/********************* WAS WORKING ON HERE *********************/}
            <Route
              exact
              path="/reactagram"
              render={props => {
                return (
                  <div>
                    <nav>
                      <a href="/profile" id="profile-photo" />
                      <div id="reactagram-logo" />
                      <ul>
                        <li>
                          <a href="/createpost">Create</a>
                        </li>
                        <li>
                          <a href="/">Log Out</a>
                        </li>
                      </ul>
                    </nav>

                    <LandingPage />
                  </div>
                );
              }}
            />

            <Route
              exact
              path="/profile"
              render={props => {
                return <Profile />;
              }}
            />

            <Route
              path="/reactagram/posts/:id"
              render={props => {
                return (
                  <div>
                    <nav>
                      <a href="/profile" id="profile-photo" />
                      <div id="reactagram-logo" />
                      <ul>
                        <li>
                          <a href="/createpost">Create</a>
                        </li>
                        <li>
                          <a href="/">Log Out</a>
                        </li>
                      </ul>
                    </nav>
                    <SinglePost {...props} postsData={this.state.postsData} />
                  </div>
                );
              }}
            />

            <Route
              exact
              path="/commmentform"
              render={props => {
                return <AddComment />;
              }}
            />

            <Route
              exact
              path="/ShowComments"
              render={props => {
                return <ShowComments />;
              }}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
