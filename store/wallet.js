
require('whatwg-fetch')

export const state = () =>({
  withdraws:[],
  payments_to:[],
  payments_me:[],
  notif:[],
  payForFreelancer:0,
  pageinationNotifs:[],
  showHistoriesAdmin: null
  })

export const mutations = {
  setWithdraws(state, withdraws){
    state.withdraws=withdraws
  },
  setNotifAdmin(state , pageinationNotifs){
    state.pageinationNotifs=pageinationNotifs
  },
  setShowHistoriesAdmin(state , showHistoriesAdmin){
    state.showHistoriesAdmin=showHistoriesAdmin
  },
  setPaymrnts_to(state, payments_to){
    state.payments_to=payments_to
  },
  setPaymrnts_me(state, payments_me){
    state.payments_me=payments_me
  },
  setNotif(state, notif){
    state.notif = notif
  },
  setPayForFreelancer(state, payForFreelancer){
    state.payForFreelancer =payForFreelancer
  },
}

export const actions = {
  deposit(context, data) {
    return this.$axios.post('/user/deposit', data)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(res.data)
        }
      })
  },
  harvest(context, data) {
    return this.$axios.post('/user/withdraw', data)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(res.data)
        }
      })
  },
  adminCharge(context, data) {
    return this.$axios.post('/admin/wallet/charge', data)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(res.data)
        }
      })
  },
  getWithdraws(context) {

  return this.$axios.get('/user/withdraws')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setWithdraws', res.data.data)
          return Promise.resolve(res.data.data)
        }
      })
  },
  getPaymentsToOthers(context) {

  return this.$axios.get('/user/payments/to')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setPaymrnts_to', res.data.data)
          return Promise.resolve(res.data.data)
        }
      })
  },
  getPaymentsToMe(context) {

  return this.$axios.get('/user/payments/me')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setPaymrnts_me', res.data.data)
          return Promise.resolve(res.data.data)
        }
      })
  },
  showNotification(context) {
  return this.$axios.get('/user/histories')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setNotif' , res.data.data)
          return Promise.resolve(res.data.data)
        }
      })
  },
  showHistoriesAdmin(context, page) {
  return this.$axios.get(`/admin/histories?page=${page}`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setShowHistoriesAdmin' , res.data)
          return Promise.resolve(res.data)
        }
      })
  },
  payForFreelancer1(context) {
  return this.$axios.get('/user/payments/payed')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setPayForFreelancer' , res.data)
          return Promise.resolve(res.data)
        }
      })
  },

}


export const getters = {
  getWithdraws(state){
    return state.withdraws
  },
  getPayments_to(state){
    return state.payments_to
  },
  getPayments_me(state){
    return state.payments_me
  },
  showNotificationGe(state){
    return state.notif
  },
  showNotificationAdmin(state){
    return state.payForFreelancer
  },
  showHistoriesAdmin(state){
    return state.showHistoriesAdmin
  },
  payForFreelancer2(state){
    return state.payForFreelancer
  }
}
