// import Vue from 'vue'
import { createStore} from 'vuex'

// Vue.use(Vuex)


const defaultLoginResult = {
  token:null,
}
export default new createStore({
  state: {
    isLogin: false,
    loginResult: defaultLoginResult,
  },
  mutations: {
    init(state){
      let loginResult = JSON.parse(localStorage.getItem("loginResult"));
      // console.log(localStorage.getItem("loginResult"));
      if (loginResult !=null){
        state.loginResult = loginResult;
      }
    },
    login(state, loginResult){
      state.loginResult = loginResult;
    },
    logout(state){
      localStorage.removeItem("loginResult");
      state.loginResult = defaultLoginResult;
    }
  },
  // actions: {
  // },
  // getters: {
  //   accessToken:state=>state.loginResult.token,
  // }
})
