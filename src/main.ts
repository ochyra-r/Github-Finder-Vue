import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import VueResurce from "vue-resource";

Vue.use(VueResurce);

Vue.config.productionTip = false;

Vue.filter("formatDate", function(value: string): string | undefined {
  if (value) {
    return new Date(value).toDateString();
  }
});

Vue.filter("formatDateHour", function(value: string): string | undefined {
  if (value) {
    return new Date(value).toLocaleTimeString();
  }
});

Vue.filter("getMessage", function(value: string): string | undefined {
  if (value) {
    return value.split("\n\n")[0];
  }
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
