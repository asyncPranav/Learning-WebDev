import SimpleForm from "./components/SimpleForm"
import MultiInputForm from "./components/MultiInputForm"
import AdvanceForm from "./components/AdvanceForm"
import UncontrolledForm from "./components/UncontrolledForm"
import BasicValidationForm from "./components/BasicValidationForm"

const App = () => {
  return (
    <div>
      <SimpleForm />
      <hr />
      <MultiInputForm />
      <hr />
      <AdvanceForm />
      <hr />
      <UncontrolledForm />
      <hr />
      <BasicValidationForm />
    </div>
  )
}

export default App
