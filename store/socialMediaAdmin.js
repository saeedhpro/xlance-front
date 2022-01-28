
require('whatwg-fetch')
export const state = () => ({
    posts:[],
  Stories:[],
    ownStories:null,

})

export const mutations = {
    setListPosts(state, posts){
        return state.posts = posts;
    },
    setListStories(state, Stories){
        return state.Stories = Stories;
    },
    addStory(state , story ){
        return state.Stories.push(story);
    },
    addPost(state, post) {
      return state.posts.push(post)
    },
    setOwnStories(state, posts) {
      return state.setOwnStories = posts
    },
    addOwnStories(state, post) {
      return state.setOwnStories.push(post)
    },
  removeStory(state, id) {
    return state.list = state.list.filter(item => item.id != id)
  }
}

export const actions = {
    getPost(context) {

    return this.$axios.get('/admin/posts')
            .then((res) => {
                if (res.status === 401) {
                    throw new Error('Bad credentials')
                } else {
                  context.commit('setListPosts' , res.data.data)
                    return Promise.resolve()
                }
            })
    },
    getStory(context) {

    return this.$axios.get('/admin/stories')
            .then((res) => {
                if (res.status === 401) {
                    throw new Error('Bad credentials')
                }
                else {
                  context.commit('setListStories' , res.data.data)
                    return Promise.resolve()
                }
            })
    },
  deleteStory(context, id) {
    return this.$axios.delete('/stories/'+id)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('removeStory', id)
          return Promise.resolve()
        }
      })
  },

}

export const getters ={
    posts(state){
        return state.posts;
    },
    stories(state){
        return state.Stories;
    }
}
