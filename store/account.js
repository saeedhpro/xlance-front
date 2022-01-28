
require('whatwg-fetch')

export const state = () =>({
  information:null,
  backgroundPicture:null,
  userPicture:null,
  user:null,
  portfolios:[],
  countries:[],
  states:[],
  cities:[],
})

export const mutations = {
  setInformation(state, information) {
    state.information = information
  },
  setBackgroundPicture(state ,backgroundPicture){
    state.backgroundPicture = backgroundPicture
  },
  setUserPicture(state,userPicture){
    state.userPicture=userPicture
  },
  setUser(state,user){
    state.user=user
  },
  setPortfolios(state, portfolios){
    state.portfolios=portfolios
  },
  addPortfolios(state, portfolios){
    state.portfolios.push(portfolios)
  },
  setCities(state, cities){
    state.cities = cities
  },
  setCountries(state, countries){
    state.countries = countries
  },
  setStates(state, states){
    state.states = states
  },
  setCv(state, data) {
      state.user.profile = {
        ...state.user.profile , [data.name] : data.value
      }
    }
}
export const actions = {
  information(context, informationData) {

    return this.$axios.put('/user/me', informationData)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve()
        }
      })
  },
  me(context) {

    return this.$axios.get('/user/me')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setUser',res.data.data)
          return Promise.resolve(res.data.data);
        }
      })
      .catch(err=>{
      })
  },
  getBackgroundPicture(context) {

  return this.$axios.get('/user/background')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(res.data.data)
        }
      })
  },
  getUserPicture(context) {

  return this.$axios.get('/user/avatar')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(res.data.data)
        }
      })
  },
  createPortfolios(context, informationData) {

    return this.$axios.post('/user/portfolios', informationData)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('addPortfolios', res.data.data)
          return Promise.resolve(res.data.data)
        }
      })
  },
  uploadImage(context, loginData) {

    return this.$axios.post('/upload', loginData)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(res.data.data)
        }
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },

  createNatinaletyPicture(context, loginData) {
    console.log(loginData, 'logindata')
    return this.$axios.put('/user/national', loginData)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          console.log(res.data)
          return Promise.resolve(res.data.data)
        }
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },
  createBackgroundPicture(context, loginData) {

    return this.$axios.put('/user/background', loginData)
      .then((res) => {
        console.log(res, "saeed")
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(res.data.data)
        }
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },
  createPictureUser(context, data) {
    return this.$axios.put('/user/avatar', data)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(res.data.data)
        }
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },
  getCountries(context) {

  return this.$axios.get('/countries')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setCountries', res.data.data)
          return Promise.resolve(res.data.data)
        }
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },
  getStatesList(context) {
  return this.$axios.get('/countries/1/states')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setStates', res.data.data)
          return Promise.resolve(res.data.data)
        }
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },
  getCitiesList(context,id) {
  return this.$axios.get(`/states/${id}/cities`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setCities', res.data.data)
          return Promise.resolve(res.data.data)
        }
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },
  getUserPortfolios(context) {

  return this.$axios.get('/user/portfolios')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setPortfolios', res.data.data)
          return Promise.resolve(res.data.data)
        }
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },

}
export const getters = {
  information(state) {
    return state.information
  },
  getBackgroundPicture(state){
    return state.backgroundPicture
  },
  getUserPicture(state){
    return state.userPicture
  },
  getUserPortfolios(state){
    return state.portfolios
  },
  me(state){
    return state.user
  },
  countries(state) {
    return state.countries
  },
  states(state) {
    return state.states
  },
  cities(state) {
    return state.cities
  }
}
