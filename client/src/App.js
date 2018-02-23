import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import './App.css';
import axios from 'axios';

import NavBar from './components/NavBar';
import LandingPage from './components/LandingPage';
import LandingPageBackdrop from './components/LandingPageBackdrop';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import SinglePost from './components/SinglePost';
import AddComment from './components/AddComments';
import ShowComments from './components/ShowComments';
import CreatePost from './components/CreatePost';
import NewPostIcon from './components/NewPostIcon';
import CommentContainer from './components/CommentContainer';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 1,
      allUserData: 'notloaded',
      userData: null,
      postsData: '',
      likeData: []
    };
  }

  grabLikes(){

    const userid = this.state.userData.id

    axios({
      url: `http://localhost:3000/api/reactagram/alluserlikes/${userid}`,
      method: 'get'
    }).then(response => {
      this.setState({ likeData: response.data})
    })
  }

  grabUserObj() {
    axios({
      url: `http://localhost:3000/api/reactagram/users/${this.state.id}`,
      method: 'get'
    }).then(response => {
      // console.log('grabUserObj: ', response.data);
      this.setState({ userData: response.data }, this.grabLikes);
    });
  }

  allUsers() {
    axios({
      url: 'http://localhost:3000/api/reactagram/users',
      method: 'get'
    }).then(response => {
      // console.log('allUser: ', response.data);
      this.setState({ allUserData: response.data });
    });
  }

  queryPosts() {
    axios({
      url: 'http://localhost:3000/api/reactagram/posts',
      method: 'get'
    }).then(response => {
      // console.log(response.data);
      this.setState({ postsData: response.data });
    });
  }

  componentDidMount() {
    this.queryPosts();
    this.grabUserObj();
    this.allUsers();
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
              path="/reactagram/login"
              render={props => {
                return (
                  <div>
                    <div id="reactagram-logo" />
                    <Login />
                    <LandingPageBackdrop
                      {...props}
                      posts={this.state.postsData}
                      users={this.state.allUserData}
                    />
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
            {/***************************************************************/}
            <Route
              exact
              path="/reactagram"
              render={props => {
                return (
                  <div id="landingPage">
                    <NavBar {...props} user={this.state.userData} />
                    <LandingPage
                      {...props}
                      userLikes={this.state.likeData}
                      posts={this.state.postsData}
                      users={this.state.allUserData}
                    />
                    <NewPostIcon {...props} />
                  </div>
                );
              }}
            />

            {/************************* PROFILE PAGE ************************/}
            {/***************************************************************/}
            <Route
              exact
              path="/reactagram/users/:id"
              render={props => {
                return (
                  <div>
                    <NavBar {...props} user={this.state.userData} />
                    <Profile
                      {...props}
                      user={this.state.userData}
                      posts={this.state.postsData}
                    />
                    <NewPostIcon {...props} />
                  </div>
                );
              }}
            />

            {/*********************** SINGLE POST PAGE **********************/}
            {/***************************************************************/}
            <Route
              path="/reactagram/posts/:id"
              render={props => {
                if(!this.state.userData) return <div className="loading-div" />;   
                return (
                  <div>
                    <NavBar {...props} user={this.state.userData} />
                    <SinglePost
                      {...props}
                      user={this.state.userData}
                      users={this.state.allUserData}
                      postsData={this.state.postsData}
                      currentUserId={this.state.id}
                      userLikes={this.state.likeData}
                    />

                    <CommentContainer
                      {...props}
                      posts={this.state.postsData}
                      users={this.state.allUserData}
                      userID={this.state.id}
                    />
                    <LandingPageBackdrop
                      {...props}
                      posts={this.state.postsData}
                      users={this.state.allUserData}
                    />
                    <NewPostIcon {...props} />
                  </div>
                );
              }}
            />

            {/********************** COMMENT FORM PAGE **********************/}
            {/***************************************************************/}
            <Route
              exact
              path="/reactagram/commmentform"
              render={props => {
                return (
                  <div>
                    <NavBar {...props} user={this.state.userData} />
                  </div>
                );
              }}
            />

            {/*********************** SHOW COMMENTS PAGE **********************/}
            {/***************************************************************/}
            <Route
              exact
              path="/reactagram/showcomments"
              render={props => {
                return (
                  <div>
                    <NavBar {...props} user={this.state.userData} />
                    <SinglePost
                      {...props}
                      user={this.state.userData}
                      users={this.state.allUserData}
                      postsData={this.state.postsData}
                    />
                    <ShowComments allUserData={this.state.allUserData} />
                    <LandingPageBackdrop
                      {...props}
                      posts={this.state.postsData}
                      users={this.state.allUserData}
                    />
                  </div>
                );
              }}
            />

            <Route
              exact
              path="/reactagram/newpost"
              render={props => {
                return (
                  <div>
                    <NavBar {...props} user={this.state.userData} />
                    <CreatePost
                      userID={this.state.id}
                      userObj={this.state.userData}
                    />
                  </div>
                );
              }}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
