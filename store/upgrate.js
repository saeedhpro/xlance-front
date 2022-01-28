
require('whatwg-fetch')

export const state = () =>({
 list:[],
  upgradePac:[]
})

export const mutations = {
  setList(state , list){
    state.list=list
  },
  setUpgradePac(state , upgradePac){
    state.upgradePac =upgradePac
  }
}

export const actions={
  getUpgrate({commit}) {
  return this.$axios.get('/packages')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          console.log(res.data.data, 'plan')
          commit('setList' ,res.data.data)
          return Promise.resolve(res.data.data)
        }
      })
  },
  getUpgratePac(context) {
  return this.$axios.get('/user/plans')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setUpgradePac' ,res.data.data)
          return Promise.resolve(res.data.data)
        }
      })
  },
  setPac(context, data) {
    return this.$axios.put('/user/package', data)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(res.data)
        }
      })
      .catch(err=>{
        return Promise.reject(err);
      })
  },
  addPac(context, loginData) {
    return this.$axios.post('/packages', loginData)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(res.data.data)
        }
      })
  },
  updatePac(context, p) {
    return this.$axios.put(`/packages/${p.id}`, p)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.dispatch('getUpgrate')
          return Promise.resolve(res.data.data)
        }
      })
  },

}
export const getters={
  getUpgrate(state){
    return state.list
  },
  getUpgradePac(state){
    return state.upgradePac
  }
}
