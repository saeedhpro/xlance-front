
require('whatwg-fetch')

export const state = () =>({
  list:[],
  searchList:null,
  ownProject:null,
  ownSentFinishedRequests: [],
  ownSentCreatedRequests: [],
  ownSentAcceptedRequests: [],
  descriptionProject: null,

  ownFinishedProjects: [],
  ownCreatedProjrct: [],
  ownAcceptedProject: [],
  ownProjectEmployer:[],
  SecurePayment:[],
  published:[],
  peymentEmployer:[]
})
export const mutations={
  setList(state, list){
    state.list = list
  },
  setSearchList(state, list){
    state.searchList = list
  },
  setOwnSentFinishedRequests(state , ownSentFinishedRequests){
    state.ownSentFinishedRequests = ownSentFinishedRequests
  },
  setOwnSentCreatedRequests(state , ownSentCreatedRequests){
    state.ownSentCreatedRequests = ownSentCreatedRequests
  },
  setOwnSentAcceptedRequests(state , ownSentAcceptedRequests){
    state.ownSentAcceptedRequests = ownSentAcceptedRequests
  },
  setDescriptionProject(state,descriptionProject){
    state.descriptionProject=descriptionProject
  },
  setownFinishedProjects(state , ownFinishedProjects){
    state.ownFinishedProjects = ownFinishedProjects
  },
  setownCreatedProjrct(state , ownCreatedProjrct){
    state.ownCreatedProjrct = ownCreatedProjrct
  },
  setownAcceptedProject(state , ownAcceptedProject){
    state.ownAcceptedProject = ownAcceptedProject
  },
  setOwnProjectEmployer(state, ownProjectEmployer){
    state.ownProjectEmployer=ownProjectEmployer
  },
  setSecurePayment(state,SecurePayment){
    state.SecurePayment=SecurePayment
  },
  setOwnProjects(state,ownProject){
    state.ownProject=ownProject
  },
  setownPublishedProjrct(state,published){
    state.published=published
  },
  setpeymentEmployer(state,peymentEmployer){
    state.peymentEmployer=peymentEmployer
  }
}
export const actions = {
  getProjects(context, route) {
  return this.$axios.get('/projects')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setList', res.data.data)
          return Promise.resolve(res.data.data)
        }
      })
      .catch(err=>{
        return Promise.reject(err)
      })
  },
  searchProjects(context, route) {
  return this.$axios.get(route)
      .then((res) => {
        context.commit('setSearchList', res.data)
        return Promise.resolve(res.data)
      })
      .catch(err=>{
        return Promise.reject(err)
      })
  },
  getOwnSentRequests(context) {

  return this.$axios.get('/user/requests/sent')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setOwnSentFinishedRequests', res.data.finished)
          context.commit('setOwnSentCreatedRequests', res.data.created)
          context.commit('setOwnSentAcceptedRequests', res.data.accepted)
          return Promise.resolve()
        }
      })
  },
  getCreateProject(context, loginData) {
    return this.$axios.post('/user/projects', loginData)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(res.data)
        }
      })
  },
  getDescriptionProject(context, id) {
  return this.$axios.get(`/projects/${id}`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setDescriptionProject', res.data.data)
          return Promise.resolve()
        }
      })
  },
  suggestProject(context, loginData) {
    return this.$axios.post('/user/requests/send', loginData)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          console.log(res.data , 'res.data')
          if(res.data.action) {
            return Promise.resolve(res.data)
          }
          return Promise.resolve(res.data.data)
        }
      })
      .catch(err=>{
        return Promise.reject(err)
      })
  },
  getProjectKarfarma(context) {

  return this.$axios.get('/user/projects')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setownFinishedProjects', res.data.finished)
          context.commit('setownCreatedProjrct', res.data.created)
          context.commit('setownPublishedProjrct', res.data.published)
          context.commit('setownAcceptedProject', res.data.started)
          return Promise.resolve()
        }
      })
  },
  getListProjectEmployer(context) {
  return this.$axios.get('user/projects/all')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setOwnProjectEmployer', res.data.data)
          return Promise.resolve()
        }
      })
  },
  SecurePayment(context , id) {

  return this.$axios.get(`/projects/${id}/payments`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setSecurePayment', res.data.data)
          return Promise.resolve()
        }
      })
  },
  removePayment(context) {

    return this.$axios.delete (`/payments/${id}`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve()
        }
      })
  },
  deleteProjectFreelancer(context , id) {
    return this.$axios.post (`/projects/${id}/cancel` , {})
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve()
        }
      })
      .catch(err=>{
        return Promise.reject(err)
      })
  },
  deleteProjectEmployer(context , data) {

    return this.$axios.post (`/projects/${data.id}/cancel/accept` , {accepted:data.accepted} )
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve()
        }
      })
  },
  deletePayment(context , id) {

    return this.$axios.delete (`/payments/${id}/cancel`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve()
        }
      })
  },
  paymentEmployer(context , id) {
    return this.$axios.post (`/payments/${id}/pay`, {})
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(res.data)
        }
      })
  },
  paymentEmployerFree(context , id) {
    return this.$axios.post (`/payments/${id}/free`, {})
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
  finishProject(context , id) {
    return this.$axios.post (`/projects/${id}/finish`, {})
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve()
        }
      })

  },
  description(context , data) {
    return this.$axios.post (`/projects/${data.id}/rate`, data.comment)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve()
        }
      })
  },
  selectRequest(context, data) {

    return this.$axios.post(`/user/projects/${data.pid}/requests/${data.id}`, {
      accepted: data.accepted
    })
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve()
        }
      })
  },
  paymentSend(context, data ) {

    return this.$axios.post(`/projects/${data.id}/payments`, {new_secure_payments : data.new_secure_payments})
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve()
        }
      })
  },
  acceptPayment(context ,data) {

    return this.$axios.post(`/payments/${data.id}/accept`, {accepted: data.accepted })
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve()
        }
      })
  },
  desputedProject(context ,data) {
    return this.$axios.post('/user/disputes' , data)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve()
        }
      })
      .catch(err=>{
        return Promise.reject()
      })
  },
  acceptFreelancer(context ,data) {
    return this.$axios.post(`/user/projects/${data.project_id}/accepted/${data.id}/accept` ,
      {accepted: data.accepted})
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve()
        }
      })
      .catch(err=>{
        return Promise.reject(err)
      })
  },
  getOwnProject(context) {
  return this.$axios.get('/user/projects/can')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setOwnProjects', res.data.id)
          return Promise.resolve()
        }
      })
  },
  getpeymentEmployer(context , id) {
  return this.$axios.get(`/projects/${id}/payments/created`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setpeymentEmployer', res.data.data)
          return Promise.resolve()
        }
      })
  },



}
export const getters={
  projects(state){
    return state.list
  },
  getOwnProject(state){
    return state.ownProject
  },
  getOwnSentFinishedRequests(state) {
    return state.ownSentFinishedRequests
  },
  getOwnSentCreatedRequests(state) {
    return state.ownSentCreatedRequests
  },
  getOwnSentAcceptedRequests(state) {
    return state.ownSentAcceptedRequests
  },
  getDescriptionProject(state){
    return state.descriptionProject
  },
  getownFinishedProjects(state){
    return state.ownFinishedProjects
  },
  getownCreatedProjrct(state){
    return state.ownCreatedProjrct
  },
  getownAcceptedProject(state){
    return state.ownAcceptedProject
  },
  getListProjectEmployer(state){
    return state.ownProjectEmployer
  },
  getSearchProjectList(state){
    return state.searchList
  },
  getPublishedProjects(state){
    return state.published
  },
  SecurePayment(state){
    return state.SecurePayment
  },
  getpeymentEmployer(state){
    return state.peymentEmployer
  },

}

