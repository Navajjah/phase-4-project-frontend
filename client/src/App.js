import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/NavBar'
import BookList from './components/BookList'
import BookDetail from './components/BookDetail'
import NewBookForm from './components/NewBookForm'
import UserList from './components/UserList'
import UserDetail from './components/UserDetail'
import NewUserForm from './components/NewUserForm'
import ReviewList from './components/ReviewList'
import NewReviewForm from './components/NewReviewForm'
//import './App.css'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/books' element={<BookList />} />
        <Route path='/users' element={<UserList />} />
        <Route path='/reviews' element={<ReviewList />} />
        <Route path='/new-review' element={<NewReviewForm />} />
        <Route path='/books/new' element={<NewBookForm />} />
        <Route path='/users/:id' element={<UserDetail />} />
        <Route path='/books/:id' element={<BookDetail />} />
        <Route path='/users/new' element={<NewUserForm />} />
      </Routes>
    </Router>
  );
}

export default App;
