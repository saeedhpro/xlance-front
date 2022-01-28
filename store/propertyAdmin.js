

require('whatwg-fetch')


export const state = () => ({
  list:[],
  sendRequest:[]
})
export const mutations = {
  setList(state,list){
    state.list=list
  },
  setSendRequest(state,sendRequest){
    state.sendRequest=sendRequest
  }
}
  export const actions = {
    addPropertyCraeteProject(context, loginData) {
      return this.$axios.post('/properties', loginData)
        .then((res) => {
          if (res.status === 401) {
            throw new Error('Bad credentials')
          } else {
            return Promise.resolve(res.data)
          }
        })
    },
    getPropertyCraeteProject(context, loginData) {
    return this.$axios.get('/properties', loginData)
        .then((res) => {
          if (res.status === 401) {
            throw new Error('Bad credentials')
          } else {
            context.commit('setList' , res.data.data)
            return Promise.resolve(res.data.data)
          }
        })
    },
    updatePac(context, p) {
  ;
      return this.$axios.put(`/properties/${p.id}`, p)
        .then((res) => {
          if (res.status === 401) {
            throw new Error('Bad credentials')
          } else {
            context.dispatch('getPropertyCraeteProject');
            return Promise.resolve(res.data.data)
          }
        })
    },
    updateReq(context, p) {
  ;
      return this.$axios.put(`//${p.id}`, p)
        .then((res) => {
          if (res.status === 401) {
            throw new Error('Bad credentials')
          } else {
            context.dispatch('getPropertyCraeteProject');
            return Promise.resolve(res.data.data)
          }
        })
    },


  }
    export const getters ={
      getPropertyCraeteProject(state){
        return state.list
      },
      getPropertySendRequest(state){
        return state.sendRequest
      }
    }
