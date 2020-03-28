import { getToken, setToken, removeToken } from "@/utils/auth";
import { login, getInfo } from "@/api/user";

// 村赤用户令牌和角色信息
const state = {
  token: getToken(),
  //角色
  roles: []
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  }
};

const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then(response => {
          const { data } = response;
          commit("SET_TOKEN", data.token);
          setToken(data.token);
          resolve(response);
        })
        .catch(error => {
          console.log("login error");
          reject(error);
        });
    });
  },
  // 获取用户角色信息
  getInfo({ commit, state }) {
    return new Promise(resolve => {
      getInfo().then(value => {
        // 请求返回的结果分为user和roleDetail,roleDetail是一个列表，取出所有的roleId
        console.log(value)
        const roles = value.data.roleDetail.map(v => v.roleId);
        commit("SET_ROLES", roles);
        resolve({ roles });
      });
    });
  },
  // 重置令牌
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit("SET_TOKEN", "");
      commit("SET_ROLES", []);
      removeToken();
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
