import { fields, useIframe } from "../utils";
export default class FormManager {
  generateForm() {
    this.generateFields();
    this.generateButtons();
  }
  setValues(interaction) {
    fields.forEach((field) => {
      document.getElementById(field.value).value = interaction[field.value];
    });
  }
  generateFields() {
    fields.forEach((field) => {
      let label = `<label id="label${field.value}" for="${field.value}">${field.text}</label>`;
      let input = `<input type="text" name="${field.value}" id="${field.value}"></input>`;
      document.getElementById(
        "form"
      ).innerHTML += `<div class="row"> ${label} ${input} </div>`;
    });
  }
  generateButtons() {
    document.getElementById("form").innerHTML += `
      <div class="buttonContainer">
        <button id="cancel" class="cancel">Cancel</button>
        <button id="confirm" class="confirm">Confirm</button>
      </div>
       `;
    document.getElementById("confirm").onclick = () => {
      if (this.validate()) {
        useIframe().sent();
      }
    };
    document.getElementById("cancel").onclick = () => {
      this.close();
    };
  }

  validate() {
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
    return valid;
  }
  close() {
    useIframe().close();
  }
}
