require('whatwg-fetch')

export const state = () =>({
  list:[],
  comment:null,
  article:null,
  comments:[],
  lasts:[]
})

export const mutations={
  setList(state, list){
    state.list = list
  },
  setcomment(state, comment){
    state.comment = comment
  },
  setArticle(state, article){
    state.article = article
  },
  setComments(state, comments){
    state.comments = comments
  },
  setLast(state, lasts){
    state.lasts=lasts
  },
  addComment(state, comment){
    state.article.comments.push(comment)
  }
}
export const actions = {
  getArticles(context) {

  return this.$axios.get('/blog/articles')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setList', res.data.data)
          return Promise.resolve()
        }
      })
  },
  getLastArticles(context) {

  return this.$axios.get('/blog/articles?page=1&limit=4')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setLast', res.data.data)
          return Promise.resolve()
        }
      })
  },
  addComment(context, loginData) {
    return this.$axios.post('/blog/articles/' + loginData.id + '/comments', loginData.comment)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('addComment', res.data.data)
          return Promise.resolve(res.data.data)
        }
      })
  },
  getArticle(context, id) {

  return this.$axios.get('/blog/articles/' + id)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setArticle', res.data.data)
          return Promise.resolve(res.data.data)
        }
      })
  },
  getComments(context, id) {

  return this.$axios.get('/blog/articles/' + id + '/comments')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setComments', res.data.data)
          return Promise.resolve(res.data.data)
        }
      })
  },

}

export const getters= {
  getArticles(state) {
    return state.list
  },
  getArticle(state) {
    return state.article
  },
  addComment(state) {
    return state.comment
  },
  getComments(state){
    return state.comments
  },
  getLastArticles(state){
    return state.lasts
  }
}
