import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const ReviewDetail = ({ review, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)

  const validationSchema = Yup.object({
    content: Yup.string().required('Content is required'),
    rating: Yup.number().required('Rating is required').min(1).max(5),
  })

  const handleDelete = () => {
    fetch(`https://phase-4-project-backend-q0g2.onrender.com/reviews/${review.id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => onDelete(review.id))
      .catch(error => console.error('Error:', error))
  }

  const handleUpdate = (values, { setSubmitting }) => {
    fetch(`https://phase-4-project-backend-q0g2.onrender.com/reviews/${review.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
      .then(response => response.json())
      .then(data => {
        onUpdate(data)  
        setIsEditing(false)
        setSubmitting(false)
      })
      .catch(error => {
        console.error('Error:', error)
        setSubmitting(false)
      })
  }

  return (
    <div className="review-detail">
      {isEditing ? (
        <Formik
          initialValues={{ content: review.content, rating: review.rating }}
          validationSchema={validationSchema}
          onSubmit={handleUpdate}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <label htmlFor="content">Content</label>
                <Field id="content" name="content" as="textarea" />
                <ErrorMessage name="content" component="div" />
              </div>
              <div>
                <label htmlFor="rating">Rating</label>
                <Field id="rating" name="rating" type="number" />
                <ErrorMessage name="rating" component="div" />
              </div>
              <button type="submit" disabled={isSubmitting}>Update Review</button>
              <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
            </Form>
          )}
        </Formik>
      ) : (
        <div>
          <p>{review.content} - Rating: {review.rating}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  )
}

export default ReviewDetail