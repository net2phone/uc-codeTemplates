import {useState, useEffect} from "react"
import { fields, useIframe } from '../utils'
import '../css/form.css'

export default function (props) {
  const [interaction, setInteraction] = useState({});
  useEffect(() => {
    setInteraction({...props.interaction})
  },[props])
  function handleChange(e){
    setInteraction(prev => ({...prev, [e.target.name]:e.target.value}))
  }
   function validate(){
    let valid = true;
    fields.forEach((field) => {
      let input = document.getElementById(field.value);
      let label = document.getElementById("label" + field.value);
      if (!input.value) {
        label.classList.add("error");
        input.classList.add("error");
        valid = false;
        return false;
      }
      label.classList.remove("error");
      input.classList.remove("error");
    });
    if (valid) {
      useIframe().sent();
    }
  }
  function close() {
    useIframe().close()
  }
  return (
    <form className="form" onSubmit={e => e.preventDefault()}>
      {fields.map((field) =>
        <div className="row" key={field.value}>
          <label htmlFor={field.value} id={'label' + field.value}>
            {field.value}
          </label>
          <input
            type="text"
            name={field.value}
            id={field.value}
            onChange={handleChange}
            value={interaction[field.value] || ''}
          />
        </div>
      )}
      <div className="buttonContainer">
      <button className="cancel" onClick={close}>Cancel</button>
      <button className="confirm" onClick={validate}>Confirm</button>
    </div>
    </form>
  )
}
