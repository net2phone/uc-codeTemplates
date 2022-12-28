<template>
  <div v-if="$props.data">
    <v-menu offset-y left v-if="$props.actions.length > 1">
      <template #activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on" :x-small="$props.xsmall">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list dense rounded>
        <v-list-item
          v-for="(item, index) in $props.actions.filter((action) =>
            action.security ? action.security($props.data) : true
          )"
          v-show="item.disabled ? !item.disabled() : true"
          :key="index"
          @click="item.method($props.data)"
        >
          <v-list-item-icon class="mr-2">
            <v-icon :color="item ? item.color : null">{{
              item ? item.icon : null
            }}</v-icon>
          </v-list-item-icon>

          <v-list-item-subtitle
            class="text-body-2"
            :class="[`${item ? item.color : null}--text`]"
          >
            {{ item }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-menu>

    <div v-if="$props.actions.length == 1">
      <v-btn
        icon
        @click.stop="$props.actions[0].method($props.data)"
        :x-small="$props.xsmall"
      >
        <v-icon :color="$props.actions[0] ? $props.actions[0].color : null">
          {{ $props.actions[0] ? $props.actions[0].icon : null }}
        </v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "ActionsMenu",

  props: {
    data: { type: Object },
    actions: { type: Array },
    disabled: { type: Boolean },
    xsmall: { type: Boolean },
  },
};
</script>
