import FormManager from "./js/formManager";
import { useIframe } from "./utils";
import "./style.css";
class Main {
  static async init() {
    let form = new FormManager({});
    form.generateForm();
    let interaction = await useIframe().getInteraction();
    document.getElementById("title").innerHTML =
      interaction && interaction.form
        ? interaction.form.split("/")[interaction.form.split("/").length - 2]
        : "uContact Form";
    form.setValues(interaction);
  }
}

Main.init();
