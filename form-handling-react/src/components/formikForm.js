import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  email: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required')
});

function FormikForm() {
  const initialValues = {
    username: '',
    email: '',
    password: ''
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // Simulate API call
    console.log('Formik registration data:', values);

    // Show success message and reset form
    setTimeout(() => {
      alert('Registration successful! Welcome aboard!');
      resetForm();
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="formik-form-container">
      <h2>User Registration (Formik)</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="registration-form">
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <Field
                type="text"
                name="username"
                className="form-field"
              />
              <ErrorMessage name="username" component="div" className="error-text" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <Field
                type="email"
                name="email"
                className="form-field"
              />
              <ErrorMessage name="email" component="div" className="error-text" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <Field
                type="password"
                name="password"
                className="form-field"
              />
              <ErrorMessage name="password" component="div" className="error-text" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-button"
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FormikForm;
