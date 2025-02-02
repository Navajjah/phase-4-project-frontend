import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'


const NewBookForm = () => {
  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    rarity: Yup.string().required('Rarity is required'),
    spell_type: Yup.string().required('Spell Type is required'),
    author: Yup.string().required('Author is required'),
    hogwarts_class: Yup.string().required('Hogwarts Class is required'),
  });

  const handleSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
    fetch('https://phase-4-project-backend-q0g2.onrender.com/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
      .then(resp => {
        if (!resp.ok) {
          return resp.json().then(errorData => {
            throw new Error(errorData.message || 'Something went wrong')
          })
        }
        return resp.json();
      })
      .then(data => {
        console.log('Book added:', data);
        setSubmitting(false);
        resetForm();
        setStatus({ success: 'Book added successfully!' })
      })
      .catch(error => {
        console.error('Error adding book:', error)
        setSubmitting(false);
        setStatus({ error: error.message });
      })
  }

  return (
    <Formik
      initialValues={{ title: '', rarity: '', spell_type: '', author: '', hogwarts_class: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, status }) => (
        <div className='book-form'>
          <h2>Add a Book</h2>
          {status && status.success && <p className="success-message">{status.success}</p>}
          {status && status.error && <p className="error-message">{status.error}</p>}
          <Form>
            <div>
              <label htmlFor="title">Title</label>
              <Field id="title" name="title" />
              <ErrorMessage name="title" component="div" className="error-message" />
            </div>
            <div>
              <label htmlFor="rarity">Rarity</label>
              <Field id="rarity" name="rarity" />
              <ErrorMessage name="rarity" component="div" className="error-message" />
            </div>
            <div>
              <label htmlFor="spell_type">Spell Type</label>
              <Field id="spell_type" name="spell_type" />
              <ErrorMessage name="spell_type" component="div" className="error-message" />
            </div>
            <div>
              <label htmlFor="author">Author</label>
              <Field id="author" name="author" />
              <ErrorMessage name="author" component="div" className="error-message" />
            </div>
            <div>
              <label htmlFor="hogwarts_class">Hogwarts Class</label>
              <Field id="hogwarts_class" name="hogwarts_class" />
              <ErrorMessage name="hogwarts_class" component="div" className="error-message" />
            </div>
            <button type="submit" disabled={isSubmitting}>Add Book</button>
          </Form>
        </div>
      )}
    </Formik>
  )
}

export default NewBookForm