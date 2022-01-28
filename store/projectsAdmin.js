require('whatwg-fetch')
export const state = () => ({
    list:[],
  dispute:[],
})
export const mutations = {
    setList(state, list){
        return state.list = list;
    },
  setDispute(state , dispute){
      return state.dispute = dispute
  }
}
export const actions = {
    getAllProjects(context) {

    return this.$axios.get('/admin/projects')
            .then((res) => {
                if (res.status === 401) {
                    throw new Error('Bad credentials')
                } else {
                  context.commit('setList' , res.data.data)
                    return Promise.resolve()
                }
            })
    },
    getDispute(context) {

    return this.$axios.get('/admin/disputes')
            .then((res) => {
                if (res.status === 401) {
                    throw new Error('Bad credentials')
                } else {
                  context.commit('setDispute' , res.data.data)
                    return Promise.resolve()
                }
            })
    },
  activeProject(context, data) {

    return this.$axios.post(`/admin/projects/${data.id}/verify`,{
      accepted:data.accepted
    })
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.dispatch('getAllProjects');
          return Promise.resolve(res.data.data)
        }
      })
      .catch(err=>{
        return Promise.reject(err)
      })
  },
  inprogressDispute(context, id) {

    return this.$axios.post(`/admin/disputes/${id}/progress`)
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
  finishDispute(context, id) {
    return this.$axios.post(`/admin/disputes/${id}/close`)
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

}

export const getters ={
  projects(state){
        return state.list;
    },
  getDispute(state){
    return state.dispute
  }
}
