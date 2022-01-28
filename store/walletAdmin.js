
require('whatwg-fetch')

export const state = () =>({
list:[]
})

export const mutations = {
  setList(state, list){
    state.list=list
  }
}
export const actions = {
  withdraws(context, data) {
  return this.$axios.get('/admin/withdraws', data)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setList' , res.data.data)
          return Promise.resolve(res.data.data)
        }
      })
    .catch(err=>{
      return Promise.reject(err)
    })
  },
  acceptWithdraws(context, data) {
    return this.$axios.post(`/admin/withdraws/${data.id}`,{accepted:data.accepted})
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.dispatch('withdraws');
          return Promise.resolve(res.data.data)
        }
      })
      .catch(err=>{
        return Promise.reject(err)
      })
  },

}
export const getters ={
  withdraws(state){
    return state.list
  }
}
