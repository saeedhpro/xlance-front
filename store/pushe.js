require('whatwg-fetch')

export const state = () =>({
  data: [],
  deviceId: null
})

export const mutations ={
  setData(state , data) {
    state.data = data
  },
  setDeviceId(state, deviceId) {
    state.deviceId = deviceId
  },
  addData(state, data) {
    state.data.push(data)
  }
}
export const actions = {
  setData(context, data) {
    context.commit('setData', data)
  },
  addData(context, data) {
    context.commit('addData', data)
  },
  setDeviceId(context, deviceId) {
    context.commit('setDeviceId', deviceId)
  },
}
export const getters={
  getData(state){
    return state.data
  },
  getDeviceId(state){
    return state.deviceId
  },
}
