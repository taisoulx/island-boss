import { temFactory } from '../utils/utils'
import confirm from "./confirm.vue";

// 向Alert组件传递data数据
export default (options) => {
  temFactory(confirm, options)
}
