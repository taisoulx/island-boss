import { temFactory } from '../utils/utils'
import Message from "./message.vue";

// 向Alert组件传递data数据
export default (options) => {
    temFactory(Message, options)
}
