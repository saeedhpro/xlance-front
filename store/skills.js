
require('whatwg-fetch')

export const state = () =>({
  list:[],
  cat:[],
  projects:0,
  cv:[]
})

export const mutations ={
  setList(state,list){
    state.list = list
  },
  setCat(state , cat){
    state.cat = cat
  },
  setProjects(state , projects){
    state.projects =projects
  },
  getCv(state, cv){
    state.cv=cv
  },
  removePortfolio(state, id) {
    return state.list = state.list.filter(item => item.id != id)
  },

}
export const actions = {
  skills(context, skillsData) {
    return this.$axios.post('/skills', skillsData)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setList', res.data.data)
          return Promise.resolve()
        }
      })
  },
  getSkills(context) {
  return this.$axios.get ('/skills')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setList', res.data.data)
          return Promise.resolve()
        }
      })
  },
  categories(context) {
  return this.$axios.get('/skills/categories')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setCat', res.data.data)
          return Promise.resolve()
        }
      })
  },
  getProjects(context) {

  return this.$axios.get('/user/projects/can')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setProjects', res.data.count)
          return Promise.resolve()
        }
      })
  },
  saveSkills(context, skills) {

    return this.$axios.post('/user/skills/add', skills)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve()
        }
      })
  },
  saveCv(context, loginData) {
    return this.$axios.put('/user/profile', loginData)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(res.data.data)
        }
      })
      .catch(err=>{
        return Promise.reject(err)
      })
  },
  deleteSkill(context, skill) {
    return this.$axios.post('/user/skills/remove', skill)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(skill)
        }
      })
  },
  deletePortfolios(context, id) {

    return this.$axios.delete(`/user/portfolios/${id}`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('removePortfolio', id)

          return Promise.resolve(id)
        }
      })
  },
  saveEducation(context, loginData) {

    return this.$axios.post('/user/educations', loginData)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(res.data.data)
        }
      })
      .catch(err=>{
        return Promise.reject(err)
      })
  },
  saveAchievement(context, loginData) {

    return this.$axios.post('/user/achievements', loginData)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(res.data)
        }
      })
      .catch(err=>{
        return Promise.reject(err)
      })
  },
  saveExperience(context, data) {

    return this.$axios.post('/user/experiences', data)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(res.data.data)
        }
      })
      .catch(err=>{
        return Promise.reject(err)
      })
  },
  getCv(context) {

  return this.$axios.get('/user/portfolios')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('getCv', res.data.count)
          return Promise.resolve()
        }
      })
  },
  uploadImage (context, loginData) {

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
  deleteExperience (context, id) {

    return this.$axios.delete(`/user/experiences/${id}`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(id)
        }
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },
  deleteEducation (context, id) {

    return this.$axios.delete(`/user/educations/${id}`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(id)
        }
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },
  deleteAchievement (context, id) {

    return this.$axios.delete(`/user/achievements/${id}`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(id)
        }
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },



}
export const getters={
  getSkills(state){
    return state.list
  },
  getCat(state){
    return state.cat
  },
  projectsCount(state){
    return state.projects
  },
  getCv(state){
    return state.cv
  }
}
