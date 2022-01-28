
require('whatwg-fetch')

export const state = () => ({
    list:[],
    article:null,
})
export const mutations = {
    setList(state, articles){
        return state.list = articles;
    },
    setArticle(state, article){
        return state.article = article;
    },
    addArticle(state , article ){
        return state.list.push(article);
    },
    removeArticle(state, id) {
      return state.list = state.list.filter(item => item.id != id)
    }
}

export const actions = {
    getArticles(context) {

    return this.$axios.get('/blog/articles')
            .then((res) => {
                if (res.status === 401) {
                    throw new Error('Bad credentials')
                } else {
                  context.commit('setList' , res.data.data)
                    return Promise.resolve()
                }
            })
    },
    getArticle(context, id) {

    return this.$axios.get('/blog/articles/' + id)
            .then((res) => {
                if (res.status === 401) {
                    throw new Error('Bad credentials')
                } else {
                    return Promise.resolve(res.data.data)
                }
            })
        .catch(err=>{
          return Promise.reject(null)
        })
    },
  getAddArticle(context, loginData) {
    return this.$axios.post('/blog/articles', loginData)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve()
        }
      })
  },
  updateArticle(context, data) {

    return this.$axios.put('/blog/articles/' + data.id, data.article)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve()
        }
      })
  },
  deleteArticle(context, id) {
    return this.$axios.delete('/blog/articles/'+id)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('removeArticle', id)
          return Promise.resolve()
        }
      })
  },


}

export const getters ={
    articles(state){
        return state.list;
    }
}
