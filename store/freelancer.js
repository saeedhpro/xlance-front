
require('whatwg-fetch')

export const state = () =>({
  list:[],
  searchList: null,
  freelancer: null,
  commentKarfarma:[],
  post:[]
})

export const mutations ={
  setList(state,list){
    state.list = list
  },
  setFreelancer(state , freelancer) {
    state.freelancer = freelancer
  },
  setCommentKarfarma(state,commentKarfarma){
    state.commentKarfarma=commentKarfarma
  },
  setSearchList(state, list){
    state.searchList = list
  },
  setFollowed(state, followed) {
    state.freelancer.followed = followed
  },
  setPost(state , post){
    state.post = post
  }
}
export const actions = {
  setFollowed(context, followed) {
    context.commit('setFollowed', followed)
  },
    getUser(context, id) {
    return this.$axios.get(`/users/${id}`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setFreelancer', res.data.data)
          context.commit('setCommentKarfarma', res.data.data.rates)
          return Promise.resolve(res.data)
        }
      })
  },
    getPost(context, id) {
    return this.$axios.get(`/users/${id}/posts`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setPost', res.data.data)
          return Promise.resolve(res.data.data)
        }
      })
  },
  getFreelancers(context) {

  return this.$axios.get(`/users/freelancers`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setList', res.data.data)
          return Promise.resolve(res.data.data)
        }
      })
  },
  getCommentKarfarma(context) {

  return this.$axios.get(``)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setCommentKarfarma', res.data.data)
          return Promise.resolve()
        }
      })
  },
  searchFreelancer(context, route) {
  return this.$axios.get(`${route}`)
      .then((res) => {
        context.commit('setSearchList', res.data)
        return Promise.resolve(res.data)
      })
      .catch(err=>{
        return Promise.reject(err)
      })
  },

}
export const getters={
  listFreelancer(state){
    return state.list
  },
  getFreelancer(state){
    return state.freelancer
  },
  getCommentKarfarma(state){
    return state.commentKarfarma
  },
  getSearchFreelancerList(state){
    return state.searchList
  },
  getAllPosts(state){
    return state.post
  }
}
