
require('whatwg-fetch')

export const state = () =>({
  myPost:[],
  posts:[],
  mystoreis:[],
  savedPost:[],
  followers:[],
  following:[],
  stories:[],
  story:null,
  descriptionPost:null,
  UserStories:0

})

export const mutations = {
  setMyPosts(state, myPost){
    state.myPost = myPost
  },
  setPosts(state, posts){
    state.posts = posts
  },
  setSavedPost(state, savedPost){
    state.savedPost = savedPost
  },
  setFolloewers(state ,followers ){
    state.followers=followers
  },
  setFollowing(state ,following){
    state.following=following
  },
  setStories(state ,stories){
    state.stories=stories
  },
  setMyStories(state ,mystoreis){
    state.mystoreis=mystoreis
  },
  setDescriptionPost(state,descriptionPost){
    state.descriptionPost=descriptionPost
  },
  setLiked(state, liked){
    state.descriptionPost.liked = liked;
    liked ? state.descriptionPost.likes_count += 1 : state.descriptionPost.likes_count -= 1
  },
  setSaved(state, saved){
    state.descriptionPost.saved = saved
  },
  removePost(state){
    state.descriptionPost = null
  },
  removeStory(state){
    state.story = null
  },
  removeStoryFromList(state, id){
    state.mystoreis = state.mystoreis.filter(i => i.id !== id)
  },
  pushPostComment(state, comment){
    state.post.comment.push(comment)
  },
  setUserStories(state, UserStories){
    state.UserStories =UserStories
  }
};

export const actions ={
  getMyPosts(context) {

  return this.$axios.get('/user/posts')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setMyPosts' , res.data.data)
          return Promise.resolve()
        }
      })
  },
  getMyStories(context) {

  return this.$axios.get('/stories/own')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setMyStories' , res.data.data)

          return Promise.resolve()
        }
      })
  },
  getStoriesList(context) {

  return this.$axios.get('/stories')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setStories' , res.data.data)
          return Promise.resolve()
        }
      })
  },
  getPosts(context) {

  return this.$axios.get('/user/posts/followings')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setPosts' , res.data.data)

          return Promise.resolve()
        }
      })
  },
  getSavedPost(context) {

  return this.$axios.get('/user/posts/saved')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setSavedPost' , res.data.data)

          return Promise.resolve()
        }
      })
  },
  getFollowers(context) {

  return this.$axios.get('/user/followers')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setFolloewers' , res.data.data)
          return Promise.resolve()
        }
      })
  },
  getFollowing(context) {

  return this.$axios.get('/user/followings')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setFollowing' , res.data.data)
          return Promise.resolve()
        }
      })
  },
  getStories(context) {

  return this.$axios.get('/stories')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setStories' , res.data.data)
          return Promise.resolve()
        }
      })
  },
  getUserStories(context) {

  return this.$axios.get('/user/stories')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setUserStories' , res.data.data)
          return Promise.resolve()
        }
      })
  },
  createPost(context, loginData) {

    return this.$axios.post('/posts', loginData)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(res.data.data)
        }
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },
  createStory(context, loginData) {
    return this.$axios.post('/stories', loginData)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(res.data.data)
        }
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },
  uploadImage(context, loginData) {

    return this.$axios.post('/upload', loginData)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(res.data.data)
        }
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },
  getDescriptionPost(context,id) {
    // context.commit('setDescriptionPost' , null)
  return this.$axios.get('/posts/'+id)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setDescriptionPost' , res.data.data)
          return Promise.resolve()
        }
      })
  },
  likePost(context,id) {

    context.commit('setLiked', true)

    return this.$axios.post('/posts/'+id+'/like')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve()
        }
      })
      .catch(err=>{
        return Promise.reject(err)
      })
  },
  unLikePost(context,id) {

    context.commit('setLiked', false)

    return this.$axios.post('/posts/'+id+'/unlike')
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
  savePost(context,id) {
    context.commit('setSaved', true)


    return this.$axios.post('/posts/'+id+'/save')
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
  unSavePost(context,id) {
    context.commit('setSaved', false)


    return this.$axios.post('/posts/'+id+'/unsave')
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
  sendComment(context,data) {
    return this.$axios.post('/posts/'+data.id+'/comments', data.comment)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('pushPostComment', res.data.data)
          return Promise.resolve(res.data.data)
        }
      })
      .catch(err=>{
        return Promise.reject(err)
      })
  },
  deletePost(context, id) {

    return this.$axios.delete('/posts/'+id)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('removePost', id)
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
          context.commit('removeStoryFromList', id)
          return Promise.resolve()
        }
      })
  },

}

export const getters={
  getMyPosts(state){
    return state.myPost
  },
  getPosts(state){
    return state.posts
  },
  getSavedPost(state){
    return state.savedPost
  },
  getFollowers(state){
    return state.followers
  },
  getFollowing(state){
    return state.following
  },
  getStories(state){
    return state.stories
  },
  getStoriesList(state) {
    return state.stories
  },
  getMyStories(state){
    return state.mystoreis
  },
  getDescriptionPost(state){
    return state.descriptionPost
  },
  getUserStories(state){
    return state.UserStories
  }
}
