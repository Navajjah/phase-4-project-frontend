import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'

function NavBar() {
    return (
        <nav className='nav-bar'>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/books">Books</Link></li>
                {/* <li><Link to="/books/new"> Add Books</Link></li> */}
                {/* <li><Link to="/users/new"> Add User</Link></li> */}
                <li><Link to="/users">Users</Link></li>
                {/* <li><Link to="/new-review"> Add Review</Link></li> */}
                <li><Link to="/reviews">Reviews</Link></li>
            </ul>
        </nav>
    )
}

export default NavBar