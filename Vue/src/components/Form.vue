<template>
  <v-row no-gutters class="fill-height justify-center">
    <!-- {{ interaction }} -->
    <FormBasicLayout
      :loading="loading"
      title="New form"
      :showActions="true"
      :flex="true"
      @back="close()"
      @continue="validate()"
    >
      <template #form ref="form">
        <v-row no-gutters>
          <v-col
            v-for="(field, index) in fields"
            :key="index"
            :cols="field.cols"
            :sm="field.sm"
            class="pa-3"
          >
            <AutomaticField v-model="item[field.value]" :field="field" />
          </v-col>
        </v-row>
      </template>
    </FormBasicLayout>
  </v-row>
</template>

<script>
import FormBasicLayout from "@/components/base/FormBasicLayout";
import AutomaticField from "@/components/base/AutomaticField";
import { required } from "@/utils/validation";

export default {
  name: "Form",
  props: {
    interaction: {
      type: Object,
    },
  },
  components: {
    FormBasicLayout,
    AutomaticField,
  },
  data() {
    return {
      loading: false,
      item: this.$props.interaction ? this.$props.interaction : {},
      fields: [
        {
          tag: "textfield",
          text: "Client Name",
          value: "clientName",
          info: "Client name",
          rules: () => [required],
          validate: () => this.validate(),
          type: () => "text",
          cols: 12,
        },
        {
          tag: "textfield",
          text: "Client id",
          value: "clientId",
          info: "Client Id",
          rules: () => [required],
          validate: () => this.validate(),
          type: () => "text",
          cols: 12,
        },
        {
          tag: "textfield",
          text: "Campaign",
          value: "campaign",
          info: "Interaction campaign",
          rules: () => [required],
          validate: () => this.validate(),
          type: () => "text",
          cols: 12,
        },
        {
          tag: "textfield",
          text: "Channel",
          value: "channel",
          info: "Interaction channel",
          rules: () => [required],
          validate: () => this.validate(),
          type: () => "text",
          cols: 12,
        },
      ],
    };
  },
  methods: {
    setItem(item) {
      this.item = item;
    },
    close() {
      this.$emit("close");
    },
    validate() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      });
    },
  },
};
</script>
