import Vue from "vue";
import vuetify from "../../../plugins/vuetify";

export const temFactory = (tmp, options) => {
  console.log(options);
  const Instance = new Vue({
    vuetify,
    render(h) {
      return h(tmp, {
        propsData: options
        // props: {}
      });
    }
  });
  const comp = Instance.$mount();
  const app = document.getElementById("app");
  try {
    app.appendChild(comp.$el);
  } catch (e) {
    console.log(e)
    // document.body.appendChild(comp.$el);
  }
  const alert = Instance.$children[0];
  // console.log(alert)
  alert.add(options);
};

export const b = () => "一个export 推荐用export defaut ,加一个禁止eslint"
