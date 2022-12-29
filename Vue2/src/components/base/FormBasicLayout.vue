<template>
  <v-card
    class="fill-height"
    :class="flex ? 'd-flex' : null"
    :height="$vuetify.breakpoint.smAndDown ? null : $props.height"
    :max-height="$vuetify.breakpoint.smAndDown ? null : $props.height"
  >
    <v-row no-gutters class="align-start">
      <!-- Title -->
      <v-col
        cols="12"
        class="pa-6 pb-0"
        v-if="$props.title || $vuetify.breakpoint.smAndDown"
      >
        <v-card-title
          class="justify-center text-h5 text--primary pa-0"
          v-if="$props.title"
        >
          {{ $props.title }}
        </v-card-title>

        <v-btn
          v-if="!$props.showActions && $vuetify.breakpoint.smAndDown"
          icon
          x-large
          class="mr-2"
          style="position: absolute; top: 0; right: 0"
          @click="$emit('back')"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-col>

      <!-- Action -->
      <v-col cols="12" :class="[{ 'px-6': $slots.action }]">
        <slot name="action" />
      </v-col>

      <v-col
        cols="12"
        class="fill-height"
        :style="[
          {
            'max-height': $slots.action
              ? 'calc(100% - 116px) !important'
              : 'calc(100% - 56px) !important',
          },
        ]"
      >
        <v-card-text class="pa-6 fill-height">
          <!-- Form -->
          <div
            :class="overflowY ? null : 'overflow-y-auto'"
            :style="[
              {
                'max-height': $props.showActions
                  ? 'calc(100% - 52px) !important'
                  : '100%',
                height: $props.showActions
                  ? 'calc(100% - 52px) !important'
                  : '100%',
              },
            ]"
          >
            <slot name="form" />
          </div>

          <!-- Actions -->
          <v-card-actions v-if="$props.showActions">
            <v-row no-gutters>
              <v-col cols="6" class="px-3">
                <v-btn block outlined rounded @click="$emit('back')">
                  {{ "Cancel" }}
                </v-btn>
              </v-col>
              <v-col cols="6" class="px-3">
                <v-btn
                  class="elevation-0"
                  block
                  rounded
                  color="primary"
                  :loading="$props.loading"
                  :disabled="$props.disabled"
                  @click="$emit('continue')"
                >
                  {{ "Save" }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "FormBasicLayout",

  props: {
    title: { type: String },
    height: { type: String },
    loading: { type: Boolean },
    disabled: { type: Boolean },
    showActions: { type: Boolean },
    overflowY: { type: Boolean, default: false },
    flex: { type: Boolean, default: false },
  },
};
</script>
