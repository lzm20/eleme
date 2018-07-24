import Vue from 'vue'
import Vuex from 'vuex'
import {ALL} from '../assets/js/initData'
Vue.use(Vuex)
const state = {
  count: 0,
  commentType: ALL
}
export const ADD_COUNT = 'addCount'
export const CHANGE_COMMENT_TYPE = 'changeCommentType'

export const mutations = {
  [ADD_COUNT] (state) {
    state.count++
  },
  [CHANGE_COMMENT_TYPE] (state, type) {
    state.commentType = type
  }
}
export default new Vuex.Store({
  state,
  mutations
})
