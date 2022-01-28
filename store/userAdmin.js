
require('whatwg-fetch')

export const state = () => ({
  token: null,
  user: null,
  users:[],
  searchList:[],
  states:[],
  city:[],
  portfolios:[],
  userChart:[],
  projectChart:[],
  lineChart:[],
  disputedChart:[],
})

export const mutations = {
  setToken (state, token) {
    state.token = token
  },
    setUsers(state,list){
      state.users = list
    },

  setUser (state, user) {
    state.user = user
  },
  setState(state ,states){
    state.states=states
  },
  setCity(state ,city){
    state.city=city
  },
  removeState(state, id) {
    return state.states = state.states.filter(item => item.id != id)
  },
  setUserPortfolios(state, portfolios){
    state.portfolios =portfolios
  },
  removePortfolio(state, id){
    state.portfolios = state.portfolios.filter(i => i.id !== id)
  },
  setSearchList(state, users){
    state.searchList = users
  },
  setUserChart(state, userChart){
    state.userChart = userChart
  },
  setProjectChart(state, projectChart){
    state.projectChart = projectChart
  },
  setLineChart(state, lineChart){
    state.lineChart = lineChart
  },
  setDisputedChart(state, disputedChart){
    state.disputedChart = disputedChart
  }

}

export const actions = {

    login(context, loginData) {
      return this.$axios.post('/login', loginData)
            .then((res) => {
                if (res.status === 401) {
                    throw new Error('Bad credentials')
                } else {
                  context.commit('setUser', res.data.user)
                  context.commit('setToken', res.data.token)
                    return Promise.resolve()
                }
            })
    },
    users(context){
    return this.$axios.get('/users')
            .then((res) => {
                if (res.status === 401) {
                    throw new Error('Bad credentials')
                } else {
                  context.commit('setUsers', res.data.data)
                    return Promise.resolve()
                }
            })
    },
    user(context , id){
    return this.$axios.get(`/users/${id}`)
            .then((res) => {
                if (res.status === 401) {
                    throw new Error('Bad credentials')
                } else {
                    return Promise.resolve(res.data.data)
                }
            })
    },
  blockAdmin(context, id) {

    return this.$axios.post(`/users/${id}/block`,{})
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.dispatch('users');
          return Promise.resolve(res.data.data)
        }
      })
      .catch(err=>{
        return Promise.reject(err)
      })
  },
  addState(context, loginData) {

    return this.$axios.post('/states', loginData)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve()
        }
      })
  },
  addCity(context, loginData) {

    return this.$axios.post('/cities', loginData)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve()
        }
      })
  },
  getStates(context){

  return this.$axios.get('/countries/1/states')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setState', res.data.data)
          return Promise.resolve()
        }
      })
  },
  getCity(context , id){

  return this.$axios.get(`/states/${id}/cities`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setCity', res.data.data)
          return Promise.resolve()
        }
      })
  },
  deleteState(context, id) {

    return this.$axios.delete('/states/'+id)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('removeState', id)
          return Promise.resolve()
        }
      })
  },

  acceptSheba(context, data) {

    return this.$axios.post(`/admin/users/${data.id}/sheba`,{accepted:data.accepted})
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.dispatch('users');
          return Promise.resolve(res.data)
        }
      })
      .catch(err=>{
        return Promise.reject(err)
      })
  },
  acceptAvatar(context, data) {

    return this.$axios.post(`/admin/users/${data.id}/avatar`,{accepted:data.accepted})
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.dispatch('users');
          return Promise.resolve(res.data)
        }
      })
      .catch(err=>{
        return Promise.reject(err)
      })
  },
  acceptBackgroud(context, data) {

    return this.$axios.post(`/admin/users/${data.id}/background`,{accepted:data.accepted})
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.dispatch('users');
          return Promise.resolve(res.data)
        }
      })
      .catch(err=>{
        return Promise.reject(err)
      })
  },
  acceptNationalCard(context, data) {

    return this.$axios.post(`/admin/users/${data.id}/national`,{accepted:data.accepted})
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.dispatch('users');
          return Promise.resolve(res.data)
        }
      })
      .catch(err=>{
        return Promise.reject(err)
      })
  },
  acceptPortfolios(context, data) {

    return this.$axios.post(`/admin/portfolios/${data.id}`,{accepted:data.accepted})
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('removePortfolio', data.id)
          return Promise.resolve(res.data)
        }
      })
      .catch(err=>{
        return Promise.reject(err)
      })
  },
  getUserPortfolios(context , id){
return this.$axios.get(`/admin/users/${id}/portfolios`)
    .then((res) => {
      if (res.status === 401) {
        throw new Error('Bad credentials')
      } else
        context.commit('setUserPortfolios' , res.data.data)
        return Promise.resolve(res.data.data)
      })
    },
  searchProjects(context, route) {
    return this.$axios.get(`/admin/search/user${route}`)
      .then((res) => {
          context.commit('setSearchList', res.data.data)
          return Promise.resolve(res.data.data)
      })
      .catch(err=>{
        return Promise.reject(err)
      })
  },
  userChart(context) {

  return this.$axios.get('/admin/charts/users')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setUserChart', res.data.data.series)
         // return Promise.resolve(res.data)
        }
      })
      .catch(err=>{
        return Promise.reject(err)
      })
  },
  projectChart(context) {

  return this.$axios.get('/admin/charts/projects')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setProjectChart', res.data.data.series)
         // return Promise.resolve(res.data)
        }
      })
      .catch(err=>{
        return Promise.reject(err)
      })
  },
  disputedChart(context) {

  return this.$axios.get('/admin/charts/disputes')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setDisputedChart', res.data.data.series)
         // return Promise.resolve(res.data)
        }
      })
      .catch(err=>{
        return Promise.reject(err)
      })
  },
  lineChart(context) {
  return this.$axios.get('/admin/charts/payments')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setLineChart', res.data.data.series)
         // return Promise.resolve(res.data.data)
        }
      })
      .catch(err=>{
        return Promise.reject(err)
      })
  },

}
export const getters = {
  token (state) {
    return state.token
  },

  user (state) {
    return state.user
  },
    users(state){
      return state.users
    },
  getStates(state){
    return state.states
  },
  getCity(state){
    return state.city
  },
  getUserPortfolios(state){
    return state.portfolios
  },
  getSearchUsersList(state){
    return state.searchList
  },
  userChart(state){
    return state.userChart
  },
  projectChart(state){
    return state.projectChart
  },
  lineChart(state){
    return state.lineChart
  },
  disputedChart(state){
    return state.disputedChart
  }
}
