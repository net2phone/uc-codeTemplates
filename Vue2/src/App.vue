<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          :src="require('@/assets/icons/favicon.png')"
          transition="scale-transition"
          width="40"
        />
      </div>
    </v-app-bar>

    <v-main>
      <Form
        :interaction="interaction"
        ref="form"
        @close="close()"
        @sent="sent()"
      />
    </v-main>
  </v-app>
</template>

<script>
import Form from "@/components/Form";
import { useIframe } from "@/utils";

export default {
  name: "App",

  components: {
    Form,
  },
  async mounted() {
    this.interaction = await useIframe().getInteraction();
    this.$refs.form.setItem(this.interaction);
  },
  data: () => ({
    interaction: {},
  }),
  methods: {
    close() {
      useIframe().close();
    },
    sent() {
      useIframe().sent();
    },
  },
};
</script>
<style>
body::-webkit-scrollbar {
  display: none;
}
</style>
