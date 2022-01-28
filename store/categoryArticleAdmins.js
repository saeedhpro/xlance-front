require('whatwg-fetch')

export const state = () => ({
  list:[]
})
export const mutations = {
    setList(state , categories){
        return state.list = categories;
    },
    addList(state , category){
        return state.list.push(category);
    },
  removeCategory(state, id) {
    return state.list = state.list.filter(item => item.id != id)
  }
}

export const actions ={
    getCategories(context) {

    return this.$axios.get('/blog/categories')
            .then((res) => {
                if (res.status === 401) {
                    throw new Error('Bad credentials')
                } else {
                  context.commit('setList' , res.data.data)
                    return Promise.resolve()
                }
            })
    },
  addCategory(context, loginData) {

    return this.$axios.post('/blog/categories', loginData)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('addList', res.data.data)
          return Promise.resolve(res.data.data)
        }
      })
  },
  deleteCategory(context, id) {

    return this.$axios.delete('/blog/categories/'+id)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('removeCategory', id)
          return Promise.resolve()
        }
      })
  },

}

export const getters ={
  categories(state){
        return state.list;
    }
}
