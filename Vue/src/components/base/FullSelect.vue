<template>
  <v-autocomplete
    v-model="$attrs.value"
    dense
    outlined
    clearable
    hide-details="auto"
    item-value="name"
    item-text="name"
    :items="$props.data.items()"
    :label="$props.data.text"
    :disabled="$props.data.disabled ? $props.data.disabled() : null"
    :rules="$props.data.rules ? $props.data.rules() : []"
    @change="$emit('input', $attrs.value)"
  >
    <template #append-outer v-if="$props.data.info">
      <v-tooltip bottom max-width="200px" color="rgba(0, 0, 0, 0.8)">
        <template #activator="{ on }">
          <v-icon color="info" v-on="on"> mdi-help-circle </v-icon>
        </template>

        <span>{{ $props.data.info }}</span>
      </v-tooltip>
    </template>

    <template #selection="{ item }">
      <template>
        {{ item.name }}
      </template>
    </template>

    <template #item="{ item }">
      <template>
        <v-list-item-content style="max-width: 200px">
          <v-list-item-title>
            <span class="font-weight-bold">
              {{ item.name }}
            </span>
          </v-list-item-title>
          <v-list-item-subtitle
            v-if="item.description"
            style="white-space: normal"
          >
            {{ item.description }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </template>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  name: "FullSelect",

  props: {
    items: { type: Array },
    data: { type: Object },
  },

  data() {
    return {};
  },
};
</script>
