<template>
  <div>
    <!-- Switch -->
    <v-switch
      v-if="$props.field.tag === 'switch'"
      :disabled="$props.field.disabled ? $props.field.disabled() : null"
      v-model="$attrs.value"
      dense
      hide-details="auto"
      class="mt-0"
      :true-value="
        typeof $props.field.trueValue !== 'undefined'
          ? $props.field.trueValue
          : true
      "
      :false-value="
        typeof $props.field.falseValue !== 'undefined'
          ? $props.field.falseValue
          : false
      "
      @change="$emit('input', $attrs.value)"
    >
      <template #label>
        <span>
          {{
            $attrs.value
              ? $props.field.textEnabled
                ? $props.field.textEnabled
                : "Enabled"
              : $props.field.textDisabled
              ? $props.field.textDisabled
              : "Disabled"
          }}
        </span>
      </template>
    </v-switch>

    <!-- Textfield -->
    <v-text-field
      v-if="
        $props.field.tag === 'textfield' && $props.field.type() !== 'number'
      "
      :disabled="$props.field.disabled ? $props.field.disabled() : null"
      v-model="$attrs.value"
      :type="$props.field.type()"
      :label="$props.field.text"
      :counter="$props.field.counter"
      :rules="$props.field.rules ? $props.field.rules() : []"
      :append-icon="$props.field.appendIcon ? $props.field.appendIcon() : null"
      :dense="$props.field.dense ? $props.field.dense() : true"
      :hide-details="
        $props.field.hideDetails ? $props.field.hideDetails() : 'auto'
      "
      outlined
      autocomplete="new-password"
      @click:append="
        $props.field.appendClick ? $props.field.appendClick() : null
      "
      @keyup.enter="$props.field.validate ? $props.field.validate() : null"
      @input="$emit('input', $attrs.value)"
      @change="$props.field.change ? $props.field.change() : null"
    >
      <template #prepend-inner v-if="$props.field.innerIcon">
        <v-tooltip bottom>
          <template #activator="{ on }">
            <v-btn icon small v-on="on" @click.stop="$props.field.innerClick()">
              <v-icon color="info" small>
                {{ $props.field.innerIcon() }}
              </v-icon>
            </v-btn>
          </template>
          <span>{{ $props.field.innerPlaceholder }}</span>
        </v-tooltip>
      </template>

      <template #append-outer v-if="$props.field.info">
        <v-tooltip bottom max-width="200px" color="rgba(0, 0, 0, 0.8)">
          <template #activator="{ on }">
            <v-icon color="info" v-on="on"> mdi-help-circle </v-icon>
          </template>
          <span>{{ $props.field.info }}</span>
        </v-tooltip>
      </template>
    </v-text-field>

    <!-- Textfield Number-->
    <v-text-field
      v-if="
        $props.field.tag === 'textfield' && $props.field.type() === 'number'
      "
      v-show="
        $props.field.show &&
        Object.prototype.toString.call($props.field.show) == '[object Function]'
          ? $props.field.show()
          : true
      "
      :disabled="$props.field.disabled ? $props.field.disabled() : null"
      v-model.number="$attrs.value"
      :type="$props.field.type()"
      :label="$props.field.text"
      :counter="$props.field.counter"
      :min="$props.field.min ? $props.field.min : '0'"
      :max="$props.field.max ? $props.field.max : null"
      :rules="$props.field.rules ? $props.field.rules() : []"
      :append-icon="$props.field.appendIcon ? $props.field.appendIcon() : null"
      :dense="$props.field.dense ? $props.field.dense : true"
      outlined
      autocomplete="new-password"
      hide-details="auto"
      @click:append="
        $props.field.appendClick ? $props.field.appendClick() : null
      "
      @keyup.enter="$props.field.validate ? $props.field.validate() : null"
      @input="inputFieldNumber"
      :prefix="$props.field.prefix ? $props.field.prefix : ''"
      @change="$props.field.change ? $props.field.change() : null"
      @keydown="notDecimal"
    >
      <template #prepend-inner v-if="$props.field.innerIcon">
        <v-tooltip bottom>
          <template #activator="{ on }">
            <v-btn icon small v-on="on" @click.stop="$props.field.innerClick()">
              <v-icon color="info" small>
                {{ $props.field.innerIcon() }}
              </v-icon>
            </v-btn>
          </template>
          <span>{{ $props.field.innerPlaceholder }}</span>
        </v-tooltip>
      </template>

      <template #append-outer v-if="$props.field.info">
        <v-tooltip bottom max-width="200px" color="rgba(0, 0, 0, 0.8)">
          <template #activator="{ on }">
            <v-icon color="info" v-on="on"> mdi-help-circle </v-icon>
          </template>
          <span>{{ $props.field.info }}</span>
        </v-tooltip>
      </template>
    </v-text-field>

    <!-- Autocomplete -->
    <v-autocomplete
      v-if="$props.field.tag === 'autocomplete'"
      v-model="$attrs.value"
      :items="$props.field.items()"
      :type="$props.field.type ? $props.field.type : 'text'"
      :disabled="$props.field.disabled ? $props.field.disabled() : null"
      :label="$props.field.text"
      :multiple="$props.field.multiple ? $props.field.multiple() : null"
      :rules="$props.field.rules ? $props.field.rules() : []"
      :item-value="$props.field.itemValue"
      :item-text="$props.field.itemText"
      hide-details="auto"
      outlined
      autocomplete="new-password"
      dense
      :chips="$props.field.chips"
      :small-chips="$props.field.chips"
      @change="
        $emit('input', $attrs.value);
        if ($props.field.change) $props.field.change();
      "
    >
      <template #append-outer v-if="$props.field.info">
        <v-tooltip bottom max-width="200px" color="rgba(0, 0, 0, 0.8)">
          <template #activator="{ on }">
            <v-icon color="info" v-on="on"> mdi-help-circle </v-icon>
          </template>
          <span>{{ $props.field.info }}</span>
        </v-tooltip>
      </template>

      <template
        #selection="{ item, index }"
        v-if="
          ['provider', 'countries'].includes($props.field.value) || field.image
        "
      >
        <template v-if="$props.field.value === 'provider' || item.image">
          <v-img
            class="mr-1"
            contain
            max-height="30"
            max-width="30"
            :src="item.image"
          >
          </v-img>
          {{ item.name }}
        </template>

        <template v-if="$props.field.value === 'countries'">
          <v-chip
            v-if="index < 2"
            :input-value="item.iso2"
            :close="$props.field.multiple()"
            small
            @click:close="
              () => {
                if ($attrs.value.includes(item.iso2)) {
                  $attrs.value.splice($attrs.value.indexOf(item.iso2), 1);
                }
              }
            "
          >
            <div
              :class="
                item.iso2 ? 'vti__flag' + ' ' + item.iso2.toLowerCase() : null
              "
            ></div>
            {{ item.name }}
          </v-chip>
          <v-chip v-if="index === 2" small>
            {{ $attrs.value.length - 2 + " " + "more countries" }}
          </v-chip>
        </template>
      </template>

      <template
        #item="{ item }"
        v-if="
          ['provider', 'countries'].includes($props.field.value) || field.image
        "
      >
        <template>
          <v-img
            v-if="$props.field.value === 'provider' || item.image"
            class="mr-1"
            contain
            max-height="30"
            max-width="30"
            :src="item.image"
          >
          </v-img>
        </template>

        <template v-if="$props.field.value === 'countries'">
          <v-checkbox
            v-if="$props.field.multiple()"
            class="mr-2"
            :input-value="
              $attrs.value ? $attrs.value.includes(item.iso2) : null
            "
          >
          </v-checkbox>
          <div
            :class="
              item.iso2 ? 'vti__flag' + ' ' + item.iso2.toLowerCase() : null
            "
          ></div>
        </template>
        {{ item.name }}
      </template>
    </v-autocomplete>

    <!-- Select -->
    <v-select
      v-if="$props.field.tag === 'select'"
      :disabled="$props.field.disabled ? $props.field.disabled() : null"
      v-model="$attrs.value"
      :items="$props.field.items()"
      :label="$props.field.text"
      :placeholder="$props.field.placeholder ? $props.field.placeholder : ''"
      :rules="$props.field.rules ? $props.field.rules() : []"
      :item-value="$props.field.itemValue"
      :item-text="$props.field.itemText"
      outlined
      dense
      clearable
      hide-details="auto"
      @change="
        $emit('input', $attrs.value);
        if ($props.field.change) {
          $props.field.change();
        }
      "
    >
      <template #prepend v-if="$props.field.innerIcon">
        <v-tooltip bottom>
          <template #activator="{ on }">
            <v-btn icon v-on="on" @click.stop="$props.field.innerClick()">
              <v-icon color="info">
                {{ $props.field.innerIcon() }}
              </v-icon>
            </v-btn>
          </template>
          <span>{{ $props.field.innerPlaceholder }}</span>
        </v-tooltip>
      </template>

      <template #selection="{ item }" v-if="$props.field.icon">
        <template>
          <v-avatar
            size="24"
            class="mr-2"
            :color="item.color"
            :style="[{ 'background-color': item.color }]"
          >
            <v-icon size="16" color="white">{{ item.icon }}</v-icon>
          </v-avatar>
          {{ item.text }}
        </template>
      </template>

      <template #item="{ item }" v-if="$props.field.icon">
        <template>
          <v-avatar
            size="24"
            class="mr-2"
            :color="item.color"
            :style="[{ 'background-color': item.color }]"
          >
            <v-icon size="16" color="white">{{ item.icon }}</v-icon>
          </v-avatar>
          {{ item.text }}
        </template>
      </template>

      <template #append-outer v-if="$props.field.info">
        <v-tooltip bottom max-width="200px" color="rgba(0, 0, 0, 0.8)">
          <template #activator="{ on }">
            <v-icon color="info" v-on="on"> mdi-help-circle </v-icon>
          </template>
          <span>{{ $props.field.info }}</span>
        </v-tooltip>
      </template>
    </v-select>

    <!-- Checkbox -->
    <v-checkbox
      v-if="$props.field.tag === 'checkbox'"
      :disabled="$props.field.disabled ? $props.field.disabled() : null"
      v-model="$attrs.value"
      :label="$props.field.text"
      dense
      hide-details="auto"
      class="mt-0"
      @click="checkBoxClick"
    >
      <template v-slot:label>
        <p class="ma-0" @click="checkboxLabelClick" style="width: 100%">
          <span class="font-weight-medium">{{ $props.field.text }}</span>
        </p>
      </template>
    </v-checkbox>
    <p
      v-if="$props.field.tag === 'checkbox' && $props.field.info"
      class="body-2 mb-0 pa-1 pl-8"
      style="opacity: 0.6"
      @click="notOpenContent"
    >
      {{ $props.field.info }}
    </p>

    <!-- Text Area -->
    <v-textarea
      v-if="$props.field.tag === 'textarea'"
      outlined
      :label="$props.field.text"
      hide-details="auto"
      :disabled="$props.field.disabled ? $props.field.disabled() : null"
      v-model="$attrs.value"
      @input="$emit('input', $attrs.value)"
      :no-resize="$props.field.noResize"
      :rules="$props.field.rules ? $props.field.rules() : null"
      :height="$props.field.height ? $props.field.height : null"
    >
      <template #append-outer v-if="$props.field.info">
        <v-tooltip bottom color="rgba(0, 0, 0, 0.8)">
          <template #activator="{ on }">
            <v-icon color="info" v-on="on"> mdi-help-circle </v-icon>
          </template>
          <span>{{ $props.field.info }}</span>
        </v-tooltip>
      </template>
    </v-textarea>

    <!-- Radio -->
    <v-radio-group
      v-if="$props.field.tag === 'radio'"
      :disabled="$props.field.disabled ? $props.field.disabled() : null"
      v-model="$attrs.value"
      row
      dense
      hide-details="auto"
      class="mt-0 pt-0 align-center"
      :rules="$props.field.rules ? $props.field.rules() : null"
    >
      <v-radio
        v-for="option in $props.field.options"
        :key="option.value"
        :label="option.text"
        :value="option.value"
        class="pa-3"
        @click="
          $props.field.value === 'internationalization'
            ? ($emit('input', $attrs.value),
              $emit('changeInternationalization', $attrs.value))
            : $emit('input', $attrs.value)
        "
      />
      <template #append>
        <v-tooltip bottom max-width="200px" color="rgba(0, 0, 0, 0.8)">
          <template #activator="{ on }">
            <v-icon color="info" class="pa-3" v-on="on">
              mdi-help-circle
            </v-icon>
          </template>
          <span>{{ $props.field.info }}</span>
        </v-tooltip>
      </template>
    </v-radio-group>

    <!-- ColorPicker -->
    <v-menu
      v-if="$props.field.tag === 'colorPicker'"
      :ref="$props.field.ref"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
      hide-details="auto"
      @input="$emit('input', $attrs.value)"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          :disabled="$props.field.disabled ? $props.field.disabled() : null"
          v-model="$attrs.value"
          :label="$props.field.text"
          readonly
          dense
          outlined
          hide-details="auto"
          v-bind="attrs"
          v-on="on"
          autocomplete="new-password"
        >
          <template #append-outer>
            <v-tooltip bottom max-width="200px" color="rgba(0, 0, 0, 0.8)">
              <template #activator="{ on }">
                <v-icon color="info" v-on="on"> mdi-help-circle </v-icon>
              </template>
              <span>{{ $props.field.info }}</span>
            </v-tooltip>
          </template>
          <template #prepend-inner>
            <v-icon :color="$attrs.value"> mdi-brush-outline </v-icon>
          </template>
        </v-text-field>
      </template>
      <v-color-picker
        class="ma-2"
        dot-size="30"
        v-model="$attrs.value"
      ></v-color-picker>
    </v-menu>

    <!-- N2P ColorPicker -->
    <v-col cols="12" v-if="$props.field.tag == 'n2pColorPicker'">
      <v-row no-gutters>
        <v-col
          v-for="(color, index) in colorList"
          :key="'color-' + index"
          cols="4"
          md="2"
          class="pa-3"
        >
          <v-hover #default="{ hover }">
            <v-card
              class="rounded-xl"
              flat
              outlined
              style="height: 60px"
              :style="[
                {
                  'background-color': !$vuetify.theme.dark
                    ? color.light
                    : color.dark,
                },
              ]"
              @click="
                $attrs.value = color.light;
                $emit('input', $attrs.value);
              "
            >
              <v-fade-transition v-if="hover || $attrs.value === color.light">
                <v-overlay
                  style="position: absolute; z-index: 1; height: 100%"
                  color="black"
                  opacity="0.2"
                >
                  <v-icon large>mdi-check</v-icon>
                </v-overlay>
              </v-fade-transition>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-col>

    <!-- Icon picker -->
    <v-col cols="12" v-if="$props.field.tag == 'iconPicker'">
      <v-row no-gutters>
        <v-col
          v-for="(icon, index) in $props.field.icons"
          :key="index"
          cols="4"
          md="2"
          class="pa-3"
        >
          <v-card
            class="rounded-xl pa-3 text-center"
            :class="[
              {
                primary: $attrs.value === icon,
                grey: $attrs.value === icon,
              },
            ]"
            outlined
            flat
            :dark="$attrs.value === icon"
            :disabled="$props.field.disabled"
            @click="
              $attrs.value = icon;
              $emit('input', $attrs.value);
            "
          >
            <v-icon size="40">
              {{ icon }}
            </v-icon>
          </v-card>
        </v-col>
      </v-row>
    </v-col>

    <!-- Iframe -->
    <v-col
      v-if="$props.field.tag === 'iframe'"
      cols="12"
      sm="12"
      md="12"
      class="pt-3 px-3"
    >
      <v-row
        no-gutters
        class="align-center rounded-lg"
        style="border: 2px solid var(--v-primary-base)"
      >
        <iframe
          class="pa-3"
          :src="$props.field.url"
          width="100%"
          height="500px"
          style="border: none"
        >
        </iframe>
      </v-row>
    </v-col>

    <!-- ConnectorImg -->
    <v-img
      :src="$props.field.img()"
      contain
      height="100"
      v-if="$props.field.tag === 'connectorImg'"
    >
      <template #placeholder>
        <Loader :size="50" />
      </template>
    </v-img>

    <!-- FullSelect -->
    <FullSelect
      v-if="$props.field.tag === 'fullselect'"
      v-model="$attrs.value"
      :data="$props.field"
      @input="$emit('input', $attrs.value)"
    />

    <!-- Subtitle -->
    <v-row
      v-if="$props.field.tag === 'subtitle'"
      no-gutters
      class="align-center pb-0"
      :class="$props.field.btnIcon ? 'pa-0' : 'pa-3'"
    >
      <v-tooltip bottom v-if="$props.field.btnIcon">
        <template #activator="{ on }">
          <v-btn
            icon
            v-on="on"
            @click.stop="$props.field.btnClick()"
            class="mr-2"
          >
            <v-icon color="info">
              {{ $props.field.btnIcon() }}
            </v-icon>
          </v-btn>
        </template>
        <span>{{ $props.field.btnPlaceholder }}</span>
      </v-tooltip>

      <v-icon
        small
        v-if="$props.field.icon"
        class="mr-2"
        :color="$props.field.icon.color"
      >
        {{ $props.field.icon.icon }}
      </v-icon>

      <span :class="$props.field.textClass">
        {{ $props.field.text }}
      </span>

      <v-spacer />

      <v-tooltip
        bottom
        left
        v-if="$props.field.info"
        max-width="200px"
        color="rgba(0, 0, 0, 0.8)"
      >
        <template #activator="{ on }">
          <v-icon color="info" v-on="on"> mdi-help-circle </v-icon>
        </template>

        <span>{{ $props.field.info }}</span>
      </v-tooltip>
    </v-row>

    <!-- Button -->
    <v-col v-if="$props.field.tag === 'button'" cols="12" class="pa-3">
      <v-btn
        :color="$props.field.color"
        :rounded="$props.field.rounded"
        :outlined="
          $props.field.outlined != undefined ? $props.field.outlined : true
        "
        @click="$props.field.onClick()"
        :loading="$props.field.loading ? $props.field.loading() : false"
        :class="$props.field.btnClass"
        :large="$props.field.large ? $props.field.large : false"
        :disabled="$props.field.disabled ? $props.field.disabled() : false"
        block
      >
        <v-icon class="mr-2" v-if="$props.field.icon">{{
          $props.field.icon
        }}</v-icon>
        {{ $props.field.text }}
      </v-btn>
    </v-col>

    <!-- DatePicker -->
    <v-menu
      v-if="$props.field.tag === 'datePicker'"
      v-model="$props.field.menu"
      :close-on-content-click="true"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="auto"
      :disabled="$props.field.disabledMenu()"
    >
      <template #activator="{ on, attrs }">
        <v-text-field
          :disabled="$props.field.disabled()"
          v-model="$attrs.value"
          :label="$props.field.text"
          prepend-inner-icon="mdi-calendar-outline"
          outlined
          dense
          readonly
          clearable
          hide-details="auto"
          v-bind="attrs"
          v-on="on"
          autocomplete="new-password"
          :rules="$props.field.rules ? $props.field.rules() : null"
        >
          <template #append-outer>
            <v-tooltip bottom max-width="200px" color="rgba(0, 0, 0, 0.8)">
              <template #activator="{ on }">
                <v-icon color="info" v-on="on"> mdi-help-circle </v-icon>
              </template>
              <span>{{ $props.field.info }}</span>
            </v-tooltip>
          </template>
        </v-text-field>
      </template>
      <v-date-picker
        v-model="$attrs.value"
        color="primary"
        :max="$props.field.maxDataDate ? $props.field.maxDataDate() : null"
        :min="$props.field.minDataDate ? $props.field.minDataDate() : null"
        @input="$emit('input', $attrs.value)"
        locale="en"
      >
      </v-date-picker>
    </v-menu>

    <!-- TimePicker -->
    <v-menu
      v-if="$props.field.tag === 'timePicker'"
      v-model="$props.field.menu"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      :return-value.sync="$attrs.value"
      offset-y
      :max-width="$props.field.maxWidth"
      :min-width="$props.field.minWidth"
      :ref="$props.field.ref"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="$attrs.value"
          :label="$props.field.text"
          prepend-inner-icon="mdi-clock-time-four-outline"
          readonly
          v-bind="attrs"
          :disabled="$props.field.disabled()"
          v-on="on"
          hide-details="auto"
          :rules="$props.field.rules ? $props.field.rules() : []"
          autocomplete="new-password"
          outlined
          dense
        >
          <template #append-outer v-if="$props.field.info">
            <v-tooltip bottom max-width="200px" color="rgba(0, 0, 0, 0.8)">
              <template #activator="{ on }">
                <v-icon color="info" v-on="on"> mdi-help-circle </v-icon>
              </template>

              <span>{{ $props.field.info }}</span>
            </v-tooltip>
          </template>
        </v-text-field>
      </template>
      <v-time-picker
        v-if="$props.field.menu"
        v-model="$attrs.value"
        full-width
        :format="'24hr'"
        @click:minute="
          $refs[$props.field.ref].save($attrs.value);
          $emit('input', $attrs.value);
        "
      ></v-time-picker>
    </v-menu>

    <!-- Avatar -->
    <v-col
      v-if="$props.field.tag === 'avatar'"
      cols="12"
      class="pa-3 text-center"
    >
      <v-avatar small size="100" class="mr-2">
        <img :src="$props.field.avatarUrl()" />
      </v-avatar>
      <v-badge
        v-if="$props.field.badge()"
        class="customBadge"
        offset-x="35"
        offset-y="-5"
        color="success"
        bordered
        bottom
        overlap
      >
        <template #badge>
          <v-btn icon style="z-index: 1" @click="$props.field.onClick()">
            <v-icon color="white"> mdi-pencil</v-icon>
          </v-btn>
        </template>
      </v-badge>
    </v-col>

    <!-- Expansion panel -->
    <v-col v-if="$props.field.tag === 'expansion-panel'" cols="12">
      <v-expansion-panels
        class="rounded-xl"
        accordion
        flat
        :style="[
          {
            border: !$props.field.border
              ? $vuetify.theme.dark
                ? 'solid thin rgba(255, 255, 255, 0.12)'
                : 'solid thin rgba(0, 0, 0, 0.12)'
              : '0',
          },
        ]"
        @change="$emit('input', $attrs.value)"
        v-if="$attrs.value"
      >
        <v-expansion-panel
          v-for="(panel, index) in $props.field.items"
          :key="index"
          :style="[
            {
              border: !$props.field.border
                ? $vuetify.theme.dark
                  ? 'solid thin rgba(255, 255, 255, 0.12)'
                  : 'solid thin rgba(0, 0, 0, 0.12)'
                : '0',
            },
          ]"
        >
          <v-expansion-panel-header class="pa-3 px-5">
            <AutomaticField
              v-model="$attrs.value[index][panel.header.value]"
              :field="panel.header"
              @change="$emit('input', $attrs.value[index][panel.header.value])"
              @openContent="openContentExpansionPanel(index, panel)"
              @checkClick="checkClick($event, index)"
            />
          </v-expansion-panel-header>
          <v-expansion-panel-content :ref="'expansionContent' + index">
            <v-row no-gutters>
              <v-col
                cols="12"
                class="pa-3"
                v-for="(content, i) in panel.content"
                :key="i"
              >
                <AutomaticField
                  v-if="$attrs.value[index][content.value]"
                  v-model="$attrs.value[index][content.value]"
                  :field="content"
                  @change="$emit('input', $attrs.value[index][content.value])"
                />
                <AutomaticField
                  v-else
                  v-model="$attrs.value"
                  :field="content"
                  @change="$emit('input', $attrs.value)"
                />
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>

    <!-- Combobox -->
    <v-combobox
      v-if="$props.field.tag === 'combobox'"
      v-model="$attrs.value"
      :items="$props.field.items()"
      :disabled="$props.field.disabled ? $props.field.disabled() : null"
      :label="$props.field.text"
      :multiple="$props.field.multiple ? $props.field.multiple() : null"
      :rules="$props.field.rules ? $props.field.rules() : []"
      hide-details="auto"
      outlined
      autocomplete="new-password"
      dense
      :chips="$props.field.chips != null ? $props.field.chips : true"
      :small-chips="$props.field.smChips != null ? $props.field.smChips : true"
      :deletable-chips="
        $props.field.delChips != null ? $props.field.delChips : true
      "
      @change="$emit('input', $attrs.value)"
    >
      <template #append-outer>
        <v-tooltip bottom max-width="200px" color="rgba(0, 0, 0, 0.8)">
          <template #activator="{ on }">
            <v-icon color="info" v-on="on"> mdi-help-circle </v-icon>
          </template>
          <span>{{ $props.field.info }}</span>
        </v-tooltip>
      </template>
    </v-combobox>

    <!-- List Checkbox -->
    <v-list
      v-if="$props.field.tag === 'check-list'"
      flat
      dense
      :max-height="$props.field.maxHeight"
      class="overflow-y-auto pa-0 transparent"
    >
      <v-list-item-group
        v-model="$attrs.value"
        multiple
        @change="$emit('input', $attrs.value)"
      >
        <v-list-item
          v-for="(item, index) in $props.field.items()"
          :key="index"
          :value="item"
        >
          <template v-slot:default="{ active }">
            <v-list-item-action>
              <v-checkbox :input-value="active" color="primary"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <!-- Regular List -->
    <v-list
      rounded
      class="fill-height pa-0"
      v-if="$props.field.tag === 'regular-list'"
      :key="$props.field.key()"
    >
      <v-list-item
        v-for="(item, index) in this.$attrs.value[this.$props.field.index][
          this.$props.field.propertie
        ]"
        :key="index"
        link
      >
        <v-list-item-content>
          <v-row no-gutters class="align-center">
            <v-col
              cols="1"
              v-if="
                $props.field.appendItem &&
                Array.isArray($props.field.appendItems()) &&
                $props.field.appendItems().find((i) => {
                  return i.soundsPK.name == item;
                })
              "
            >
              <v-btn icon @click="$props.field.appendClick(item)">
                <v-icon>
                  {{
                    $props.field.appendItems().find((i) => {
                      return i.soundsPK.name == item;
                    }).isPlaying
                      ? "mdi-pause"
                      : "mdi-play"
                  }}
                </v-icon>
              </v-btn>
            </v-col>
            <v-col cols="11" :class="$props.field.appendItem ? 'pl-5' : null">
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-col>
          </v-row>
        </v-list-item-content>

        <v-list-item-action v-if="$props.field.actions">
          <ActionsMenu :data="{ name: item }" :actions="$props.field.actions" />
        </v-list-item-action>
      </v-list-item>
      <p
        class="text-subtitle-1 text--secondary text-center"
        v-if="
          this.$attrs.value[this.$props.field.index][
            this.$props.field.propertie
          ].length == 0
        "
      >
        {{ this.$props.field.noItemsText }}
      </p>
    </v-list>
  </div>
</template>

<script>
import FullSelect from "@/components/base/FullSelect";
import ActionsMenu from "@/components/base/ActionsMenu";
import Loader from "@/components/base/Loader";

export default {
  name: "AutomaticField",

  components: {
    FullSelect,
    ActionsMenu,
    Loader,
  },

  props: {
    field: { type: Object },
    valid: { type: Boolean },
  },

  data() {
    return {
      colorList: [
        { light: "#0095FF", dark: "#0084e1" },
        { light: "#002540", dark: "#003866" },
        { light: "#1685b5", dark: "#1086b6" },
        { light: "#90ce4c", dark: "#83ad52" },
        { light: "#ff9800", dark: "#d78100" },
        { light: "#f44349", dark: "#ba2a30" },
      ],
    };
  },

  created() {
    if (
      this.$props.field.tag == "expansion-panel" &&
      this.$attrs.value &&
      this.$attrs.value.length
    ) {
      this.$attrs.value.map((v) => {
        if (v.active || v.syslog) {
          v.active = v.active == "0" ? 0 : 1;
          v.syslog = v.syslog == "0" ? 0 : 1;
        }
      });
    }

    if (
      this.$props.field.tag == "textfield" &&
      this.$props.field.type() == "number"
    ) {
      this.$attrs.value = this.$attrs.value ? this.$attrs.value : 0;
    }
  },
  methods: {
    notDecimal(e) {
      if (
        e.key === "." ||
        e.key === "," ||
        e.key.toLowerCase() === "e" ||
        e.key.toLowerCase() === "-" ||
        e.key.toLowerCase() === "+"
      ) {
        e.preventDefault();
      }
    },
    inputFieldNumber(e) {
      if (e.includes(".") || e.includes(",")) {
        this.$attrs.value = Math.ceil(e);
      }
      if (e.includes("-")) {
        this.$attrs.value = Math.abs(e);
      }
      this.$emit("input", this.$attrs.value);
    },

    checkboxLabelClick() {
      if (this.$props.field.disabledLabelCheck) {
        this.$emit("openContent");
      }
    },
    notOpenContent(e) {
      e.preventDefault();
      e.stopPropagation();
    },
    openContentExpansionPanel(index, panel, aux) {
      if (!aux) {
        this.$attrs.value[index][panel.header.value] =
          !this.$attrs.value[index][panel.header.value];
      }
    },
    checkBoxClick(e) {
      if (!this.$attrs.value) {
        this.$emit("checkClick", e);
      }
      this.$emit("input", this.$attrs.value);
    },
    checkClick(e, index) {
      if (
        (this.$refs["expansionContent" + index][0].$el.style?.display !=
          "none" &&
          !this.$refs["expansionContent" + index][0].$el.style) ||
        (this.$refs["expansionContent" + index][0].$el.style?.display ==
          "none" &&
          this.$refs["expansionContent" + index][0].$el.style)
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
  },
};
</script>
<style lang="scss">
.v-input__prepend-outer {
  margin-top: 1px !important;
}

.v-input__prepend-inner {
  margin-top: 5px !important;
}
.v-textarea {
  height: 100%;
  .v-input__control {
    height: 100%;
  }
}
</style>
