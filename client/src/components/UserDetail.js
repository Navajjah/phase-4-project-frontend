import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './UserDetail.css'

function UserDetail() {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newUsername, setNewUsername] = useState('')

  useEffect(() => {
    fetchUserData()
  }, [id])

  const fetchUserData = async () => {
    try {
      const response = await fetch(`https://phase-4-project-backend-q0g2.onrender.com/users/${id}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      setUser(data)
      setLoading(false)
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  const handleEditUsername = async () => {
    try {
      const response = await fetch(`https://phase-4-project-backend-q0g2.onrender.com/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: newUsername }),
      })
      if (!response.ok) {
        throw new Error('Failed to update username')
      }
      await fetchUserData()
      setNewUsername('')
    } catch (error) {
      setError(error.message)
    }
  }

  const handleDeleteUser = async () => {
    try {
      const response = await fetch(`https://phase-4-project-backend-q0g2.onrender.com/users/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      console.log('User deleted successfully')
    } catch (error) {
      setError(error.message)
    }
  }

  // const handleAddFavorite = async (bookId) => {
  //   try {
  //     const response = await fetch(`https://phase-4-project-backend-q0g2.onrender.com/users/${id}/favorites/${bookId}`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ book_id: bookId }),
  //     })
  //     if (!response.ok) {
  //       throw new Error('Failed to add favorite')
  //     }
  //     await fetchUserData()
  //   } catch (error) {
  //     setError(error.message)
  //   }
  // }

  const handleRemoveFavorite = async (bookId) => {
    try {
      const response = await fetch(`https://phase-4-project-backend-q0g2.onrender.com/users/${id}/favorites/${bookId}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to remove favorite')
      }
      await fetchUserData()
    } catch (error) {
      setError(error.message)
    }
  }

  if (loading) return <div className="loading">🔮 Loading user data...</div>
  if (error) return <div className="error">⚠️ Error: {error}</div>
  if (!user) return <div className="error">User not found</div>

  return (
    <div className="user-display">
      <h1>{user.username}</h1>
      <div className="edit-section">
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          placeholder="New Username"
        />
        <button onClick={handleEditUsername} className='edit-btn'>Edit</button>
        <button onClick={handleDeleteUser} className="delete-btn">Delete</button>
      </div>

      <h2>Favorite Books</h2>
      {user.favorites.length > 0 ? (
        <ul>
          {user.favorites.map(book => (
            <li key={book.id} className="favorite-item">
              <h3>📖 {book.title}</h3>
              <p>✍️ Author: {book.author}</p>
              <p>✨ Rarity: {book.rarity}</p>
              <p>🔮 Spell Type: {book.spell_type}</p>
              <p>🏫 Hogwarts Class: {book.hogwarts_class}</p>
              <button onClick={() => handleRemoveFavorite(book.id)} className="remove-btn">Remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorite books found.</p>
      )}

      {/* <div className="add-favorite-section">
        <h3>📚 Add a Favorite Book</h3>
        <input type="text" placeholder="Enter Book ID" id="add-favorite-book-id" />
        <button onClick={() => handleAddFavorite(document.getElementById('add-favorite-book-id').value)}>➕ Add</button>
      </div> */}
    </div>
  )
}

export default UserDetail
