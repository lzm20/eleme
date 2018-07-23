import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  count: 0
}
const mutation = {
  ADD_COUNT (state) {
    state.count++
  }
}
export default new Vuex.Store({
  state,
  mutation
})
