<template>
  <v-card>
    <v-card-text class="pa-6">
      <v-card-title class="justify-center text-h5">
        {{ $props.title }}
      </v-card-title>

      <v-row no-gutters class="align-start">
        <v-col cols="12" class="pa-3">
          <v-alert border="left" text :type="$props.type" class="mb-0">
            {{ "Are you sure?" }}
          </v-alert>
        </v-col>

        <v-col cols="12" class="pa-3">
          <slot name="content" />
        </v-col>
      </v-row>

      <v-card-actions>
        <v-row no-gutters>
          <v-col cols="6" class="px-3">
            <v-btn
              block
              outlined
              rounded
              :disabled="$props.loading"
              @click="$emit('back')"
            >
              {{ "Cancel" }}
            </v-btn>
          </v-col>
          <v-col cols="6" class="px-3">
            <v-btn
              class="elevation-0"
              block
              rounded
              :color="$props.type"
              :loading="$props.loading"
              @click="$emit('continue')"
            >
              {{ "Confirm" }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ConfirmForm",

  props: {
    title: { type: String },
    loading: { type: Boolean },
    type: { type: String },
  },
};
</script>
