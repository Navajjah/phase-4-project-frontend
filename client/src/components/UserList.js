import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './UserList.css'
import NewUserForm from './NewUserForm'
import feather from '../Assets/icons/quill-drawing-a-line.png'

function UserList() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true);
        fetch('https://phase-4-project-backend-q0g2.onrender.com/users')
            .then(resp => {
                if (!resp.ok) {
                    throw new Error('Network response was not ok');
                }
                return resp.json();
            })
            .then(data => {
                console.log('Fetched users:', data)
                setUsers(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching users:', error)
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const addUser = (newUser) => {
        setUsers(prevUsers => [...prevUsers, newUser]); 
    }

    return (
        <div className='user-list-container'>
            <h1>Hogwarts Students <img src={feather} alt="Feather Icon" className='feather-icon'/></h1>
            {loading && <p>Loading users...</p>}
            {error && <p>Error loading users: {error}</p>}
            <ul className="user-list">
                {users.map(user => (
                    <li key={user.id}>
                        <Link to={`/users/${user.id}`}>{user.username}</Link>
                    </li>
                ))}
            </ul>
            <NewUserForm addUser={addUser} /> 
        </div>
    )
}

export default UserList
