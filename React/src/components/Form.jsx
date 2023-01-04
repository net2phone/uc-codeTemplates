import { fields, useIframe } from '../utils'
import '../css/form.css'

function InputList(props) {
  let interaction = props.interaction;
  return fields.map((field) =>
    <div className="row" key={field.value}>
      <label htmlFor={field.value} id={'label' + field.value}>
        {field.value}
      </label>
      <input
        type="text"
        name={field.value}
        id={field.value}
        value={interaction[field.value]}
      />
    </div>
  );
}

function Buttons() {
  let validate = ()=>{
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
  let close = () => {
    useIframe().close()
  }
  return (
    <div className="buttonContainer">
      <button className="cancel" onClick={close}>Cancel</button>
      <button className="confirm" onClick={validate}>Confirm</button>
    </div>
  )
}

export default function(props){
  return (
    <form className="form" onSubmit={e => e.preventDefault()}>
      <InputList interaction={ props.interaction } />
      <Buttons/>
    </form>
  )
}
