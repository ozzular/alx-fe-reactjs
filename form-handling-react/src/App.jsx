import RegistrationForm from './components/RegistrationForm'
import FormikForm from './components/formikForm'
import './App.css'

function App() {
  return (
    <div className="App">
      <h1>React Form Handling Examples</h1>
      <div className="forms-container">
        <div className="form-section">
          <h2>Controlled Components</h2>
          <RegistrationForm />
        </div>
        <div className="form-section">
          <h2>Formik with Yup Validation</h2>
          <FormikForm />
        </div>
      </div>
    </div>
  )
}

export default App
