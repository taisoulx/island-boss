import Vue from 'vue'
import message from "./message/message";
import confirm from "./confirm/confirm";

Vue.prototype.$message = message;
Vue.prototype.$confirm = confirm;
