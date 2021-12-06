import { createStore } from 'vuex'

export default createStore({
  state: {
    accessToken: "",
    currentUser: ""
  },
  mutations: {
    setCurrentUser(state, { user }) {
      state.currentUser = user
    },
    loginUser(state, { accessToken }) {
      state.accessToken = accessToken
    },
    logoutUser(state) {
      state.accessToken = ""
      state.currentUser = ""
    }
  }
})
