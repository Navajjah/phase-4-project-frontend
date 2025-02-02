import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './BookDetail.css'

function BookDetail() {
    const { id } = useParams()
    const [book, setBook] = useState(null)

    useEffect(() => {
        fetch(`https://phase-4-project-backend-q0g2.onrender.com/books/${id}`)
        .then(resp => resp.json())
        .then(data => setBook(data))
    }, [id])

    if (!book) {
        return <div>Loading...</div>
    }

    return (
        <div className='book-detail'>
            <h1>{book.title}</h1>
            <p>Author: {book.author}</p>
            <p>Rarity: {book.rarity}</p>
            <p>Spell Type: {book.spell_type}</p>
            <p>Hogwarts Class: {book.hogwarts_class}</p>
        </div>
    )
}

export default BookDetail