//  UI state

let state = {
  locale: 'ru',
  text: {},
  local_text: {},
  projectViewMode: 'normal',
  active_tab: 'editor',
  LoadProjectDialogShow: false,
  ConnectWindowShow: false,
  LoginWindowShow: false,
  AboutWindowShow: false,
  CompareWindowShow: false
}

const mutations = {
  TOGGLELANGUAGE (state) {
    state.locale === 'ru' ? (state.locale = 'en') : (state.locale = 'ru')
    state.text = state.local_text[state.locale]
  },
  SETACTIVETAB (state, payload) {
    state.active_tab = payload
  },
  COMPAREWINDOWTOGGLE (state) {
    state.CompareWindowShow = !state.CompareWindowShow
  },
  LOGINTOGGLE (state) {
    state.LoginWindowShow = !state.LoginWindowShow
  },
  ABOUTTOGGLE (state) {
    state.AboutWindowShow = !state.AboutWindowShow
  },
  LOADPROJECTTOGGLE (state) {
    state.LoadProjectDialogShow = !state.LoadProjectDialogShow
  },
  CONNECTWINDOWSHOW (state) {
    state.ConnectWindowShow = !state.ConnectWindowShow
  },
  SETPROJECTVIEWMODE (state, payload) {
    state.projectViewMode = payload
  },
  UITEXT (state, payload) {
    state.text = payload[state.locale]
    state.local_text = payload
  }
}

const actions = {
  TOGGLELANGUAGE (context) {
    context.commit('TOGGLELANGUAGE')
  },
  SETACTIVETAB (context, payload) {
    console.log('SETACTIVETAB', payload)
    context.commit('SETACTIVETAB', payload)
  },
  CONNECTWINDOWSHOW (context) {
    context.commit('CONNECTWINDOWSHOW')
  },
  LOGINSHOW (context) {
    context.commit('LOGINTOGGLE')
  },
  ABOUTSHOW (context) {
    context.commit('ABOUTTOGGLE')
  },
  SETPROJECTVIEWMODE (context, payload) {
    context.commit('SETPROJECTVIEWMODE', payload)
  },
  UITEXT (context, payload) {
    context.commit('UITEXT', payload)
  }
}

export default {
  state,
  mutations,
  actions
}
