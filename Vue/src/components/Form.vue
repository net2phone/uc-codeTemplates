<script setup>
import { ref, watch } from "vue";

const props = defineProps(["interaction"]);

const interaction = ref({});

const fields = ref([
  { text: "Client Id", value: "clientId" },
  { text: "Client name", value: "clientName" },
  { text: "Channel", value: "channel" },
  { text: "Campaign", value: "campaign" },
]);

watch(
  () => props.interaction,
  (newValue) => {
    interaction.value = newValue;
  }
);
</script>

<template>
  <form class="form" action="javascript:void(0);">
    <div class="row" v-for="(field, index) in fields" :key="index">
      <label :for="field.value">
        {{ field.text }}
      </label>
      <input
        type="text"
        :name="field.value"
        v-model="interaction[field.value]"
      />
    </div>
    <div class="buttonContainer">
      <button @click="this.$emit('close')" class="cancel">Cancel</button>
      <button @click="this.$emit('confirm')" class="confirm">Confirm</button>
    </div>
  </form>
</template>

<style scoped>
.form {
  margin: 0 auto;
  width: 100%;
  height: 100%;

  position: relative;
  /* background: green; */
}
.row {
  margin: 0 auto;
  width: 80%;
  padding: 0.5rem;
  /* background: red; */
}
.buttonContainer {
  position: absolute;
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0;
}
.buttonContainer button {
  width: 37.5%;
  margin: 0 2.5%;
  height: 2rem;
  border: 1px solid rgb(37, 37, 37);
  border-radius: 1rem;
  transition: 0.5s;
}
.buttonContainer .confirm {
  color: white;
  border: none;
  background: #0095ff;
}
.buttonContainer .confirm:hover {
  background: #026db9;
}
.buttonContainer .cancel {
  background: #ffff;
}
.buttonContainer .cancel:hover {
  background: rgb(197, 197, 197);
}
label {
  font-family: Verdana, sans-serif;
  font-size: 1rem;
}
input {
  margin: 5px auto;
  border: 1px solid rgb(37, 37, 37);
  border-radius: 5px;
  width: 100%;
  height: 2rem;
  transition: 0.5s !important;
}
input:focus {
  border: 1px solid #0095ff !important;
  outline: none;
}
</style>
light: { primary: "#0095FF", secondary: "#002540", accent: "#1685b5", info:
"#0095FF", success: "#90ce4c", warning: "#ff9800", error: "#f44349", },
