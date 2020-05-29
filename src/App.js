import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

import AuthRoute from './util/AuthRoutes';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import SinglePost from './pages/SinglePost';
import Profile from './pages/Profile';
import MenuBar from './components/MenuBar';

function App() {
  return (
      <AuthProvider>
        <Router>
            <MenuBar></MenuBar>
            <Route exact path="/" component={ Home }/>
            <AuthRoute exact path="/login" component={ Login }/>
            <AuthRoute exact path="/register" component={ Register }/>
            <Route exact path="/posts/:postId" component={ SinglePost }/>
            <Route exact path="/users/:userId" component={ Profile }/>
        </Router>
      </AuthProvider>
  );
}

export default App;
