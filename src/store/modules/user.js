//  USER state
import axios from 'axios'

let state = {
  user: {},
  islogin: false
}

const mutations = {
  LOGINUSERDATA (state, payload) {
    state.user = payload
  },
  EXIT (state, payload) {
    state.user = {}
    state.islogin = false
    localStorage.username = ''
    localStorage.token = ''
  },
  USERDATA (state, payload) {
    state.user.data = payload
    localStorage.username = payload.name
    state.islogin = true
  },
  USERTOKEN (state, payload) {
    localStorage.token = payload
    state.user.token = payload
  }
}

const actions = {
  SENDLOGIN (context, payload) {
    axios({
      method: 'POST',
      url: this.state.fullServerUrl + '/token/' + payload.login,
      data: {
        passwd: payload.pass
      }
    })
      .then(function (response) {
        // check response before close!! temporary
        context.commit('USERTOKEN', response.data)
        context.commit('LOGINTOGGLE')
        context.dispatch('GETCURRENTUSER')
        // check token
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  GETCURRENTUSER (context, payload) {
    let url = this.state.fullServerUrl + '/current_user'
    axios
      .get(url, {
        headers: { Authorization: 'Token ' + localStorage.token }
      })
      .then(function (response) {
        context.commit('USERDATA', response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

}

export default {
  state,
  mutations,
  actions
}
