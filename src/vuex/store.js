import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var state = {
  // token: '',
  url: 'http://115.159.211.21:8000'
}

export default new Vuex.Store({
  state
})
