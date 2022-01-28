
require('whatwg-fetch')

export const state = () =>({
  employer: null,
})

export const mutations ={
  setEmployer(state , employer) {
    state.employer = employer
  },
  setFollowed(state, followed) {
    state.employer.followed = followed
  }
}
export const actions = {
    getEmployer(context, id) {

    return this.$axios.get(`/users/${id}`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setEmployer', res.data.data)
          return Promise.resolve(res.data.data)
        }
      })
  },
  setFollowed(context, followed) {
      context.commit('setFollowed', followed)
  },

}
export const getters={

  getEmployer(state){
    return state.employer
  },

}
