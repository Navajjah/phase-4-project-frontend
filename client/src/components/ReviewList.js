// src/components/ReviewList.js
import React, { useEffect, useState } from 'react'
import ReviewDetail from './ReviewDetail'
import NewReviewForm from './NewReviewForm'
import './ReviewList.css'

function ReviewList() {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    fetch('https://phase-4-project-backend-q0g2.onrender.com/reviews')
      .then(resp => resp.json())
      .then(data => setReviews(data))
      .catch(error => console.error('Error:', error))
  }, [])

  const handleDelete = (id) => {
    setReviews(reviews.filter(review => review.id !== id))
  }

  const handleUpdate = (updatedReview) => {
    setReviews(reviews.map(review => review.id === updatedReview.id ? updatedReview : review))
  }

  return (
    <div className='review-list-container'>
      <h1>Reviews</h1>
      <ul className='review-list'>
        {reviews.map(review => (
          <li key={review.id}>
            <ReviewDetail
              review={review}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          </li>
        ))}
      </ul>
      <NewReviewForm />
    </div>
  )
}

export default ReviewList