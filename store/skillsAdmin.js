
require('whatwg-fetch')

export const state = () => ({
    list:[],
    skill:null,
    listCategories:[]
});

export const mutations ={
    setList(state , skills){
        return state.list =skills;
    },
    addSkill(state , skill){
        return state.list.push(skill)
    },
  setListCategories(state,listCategories){
      return state.listCategories=listCategories
  },
  removeSkill(state, id) {
    return state.list = state.list.filter(item => item.id != id)
  },
  removeCategory(state, id) {
    return state.listCategories = state.listCategories.filter(item => item.id != id)
  }
}
export const actions = {
    getSkills(context) {

    return this.$axios.get('/skills')
            .then((res) => {
                if (res.status === 401) {
                    throw new Error('Bad credentials')
                } else {
                  context.commit('setList' , res.data.data)
                    return Promise.resolve()
                }
            })
    },
    addSkills(context , skill){

      return this.$axios.post('/skills' , skill)
            .then((res)=>{
                if (res.status === 401) {
                    throw new Error('Bad credentials')
                } else {
                  context.commit('addSkill' , res.data.data)
                    return Promise.resolve()
                }
            })
    },
  getSkillCategoried(context) {

  return this.$axios.get('/skills/categories')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setListCategories' , res.data.data)
          return Promise.resolve()
        }
      })
  },
  addCategory(context, loginData) {
    return this.$axios.post('/skills/categories', loginData)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(res.data.data)
        }
      })
  },
  deleteSkill(context, id) {

    return this.$axios.delete('/skills/'+id)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('removeSkill', id)
          return Promise.resolve()
        }
      })
  },
  deleteCategory(context, id) {

    return this.$axios.delete('/skills/categories/'+id)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('removeCategory', id)
          return Promise.resolve()
        }
      })
  },
  uploadImage (context, loginData) {

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

}
export const getters ={
    skills(state){
        return state.list;
    },
  getSkillCategoried(state){
      return state.listCategories
  }
}
