import './App.css';
// tools
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// components
import Navbar from './components/layout/Navbar'
import Home from './components/layout/Home'
import Alert from './components/layout/Alert'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Dashboard from './components/dashboard/Dashboard';
import ProtectedRoute from './components/routes/ProtectedRoute';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import Notes from './components/notes/Notes';
import NoteItem from './components/notes/NoteItem';

// redux
import store from './store'
import { Provider } from 'react-redux'
import { getUser } from './actions/auth'
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  
  useEffect(() => {
    store.dispatch(getUser())
  }, [])
  
  return (
    <Provider store={store}>
      <Router>
        
        <Navbar />
        <Route exact path="/" component={Home} />
        
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/dashboard" component={Dashboard} />
            <ProtectedRoute exact path="/community" component={Posts} />
            <ProtectedRoute exact path="/community/:post_id" component={Post} />
            <ProtectedRoute exact path="/book/:book_id" component={Notes} />
            <ProtectedRoute exact path="/book/:book_id/:note_id" component={NoteItem} />
          </Switch>
        </section>
        
      </Router>
    </Provider>
  );
}

export default App;
