
require('whatwg-fetch')

export const state = () =>({
  portfolio: null,
})

export const mutations ={
  setPortfolio(state, portfolio){
    state.portfolio = portfolio
  },
}
export const actions = {

  getPortfolio(context, id) {

    return this.$axios.get(`/portfolios/${id}`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setPortfolio', res.data.data)
          return Promise.resolve(res.data.data)
        }
      })
  },

}
export const getters={
  getPortfolio(state){
    return state.portfolio
  },
}
