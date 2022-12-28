import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#0095FF",
        secondary: "#002540",
        accent: "#1685b5",
        info: "#0095FF",
        success: "#90ce4c",
        warning: "#ff9800",
        error: "#f44349",
      },
      dark: {
        primary: "#0084e1",
        secondary: "#003866",
        accent: "#1086b6",
        info: "#0084e1",
        success: "#83ad52",
        warning: "#d78100",
        error: "#ba2a30",
      },
    },
  },
});
