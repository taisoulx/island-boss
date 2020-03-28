import Vue from "vue";
// import * as VeeValidate from 'vee-validate'
import {
 ValidationProvider, ValidationObserver, extend,
} from "vee-validate";
import {
 max, min, alpha_num as alphaNum, integer
} from "vee-validate/dist/rules";
// import { required } from "vee-validate/dist/rules";
// import zh from "vee-validate/dist/locale/zh_CN"; // 引入中文包，提示信息可以以中文形式显示

// Add a rule. 邮箱规则校验
extend("email", {
  validate: val => {
    const check = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(val);
    return check;
  },
  message: "请输入正确的邮箱格式"
});

// rule {field}不能为空
extend("required", {
  validate(value) {
    return {
      required: true,
      valid: ["", null, undefined].indexOf(value) === -1
    };
  },
  message: field => `${field}不能为空`,
  computesRequired: true
});

// rul.输入最少位数
extend("min", {
  ...min,
  message: (field, { length }) => `${field}至少输入${length}位`
});

// rule.输入最多位数
extend("max", {
  ...max,
  message: (field, { length }) => `${field}最多输入${length}位`
});

// 只能输入字母和数字
extend("alpha_num", {
  ...alphaNum,
  message: field => `${field}只能输入字母和数字`
});

// 只能输入整数
extend('isNum', {
  ...integer,
  message: field => `${field}只能输入整数`
})

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
