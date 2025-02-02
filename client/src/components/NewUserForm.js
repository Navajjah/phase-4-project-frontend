import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'


const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
});

const NewUserForm = () => {
  
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch('https://phase-4-project-backend-q0g2.onrender.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json()
      console.log('User added:', data)
      setSubmitting(false);
      resetForm();
    } catch (error) {
      console.error('Error adding user:', error)
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ username: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <div className="user-form">
          <Form>
            <div>
              <label htmlFor="username">Username</label>
              <Field id="username" name="username" />
              <ErrorMessage name="username" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Add User
            </button>
          </Form>
        </div>
      )}
    </Formik>
  )
}

export default NewUserForm