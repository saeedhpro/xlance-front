require('whatwg-fetch')
export const state = () =>({
  token:null,
  user:null,
  email:null,
  notification:[],
  settings:null,
  disputes:[],
  closeDisputes:[],
  createdSecurePayments:[],
  NotificationAdmin:[],
  pageinationNotifs: null
})
export const mutations ={
  setToken (state, token) {
    state.token = token
  },
  setSettings (state, settings) {
    state.settings = settings
  },
  setUser (state, user) {
    state.user = user
  },
  setEmail(state , email){
    state.email = email
  },
  setPageinationNotifs(state , pageinationNotifs){
    state.pageinationNotifs = pageinationNotifs
  },
  setNotification(state ,notification){
    state.notification =notification
  },
  setNotificationAdmin(state ,NotificationAdmin){
    state.NotificationAdmin =NotificationAdmin
  },
  setCloseDisputes(state ,closeDisputes){
    state.closeDisputes =closeDisputes
  },
  setDisputes(state ,disputes){
    state.disputes =disputes
  },
  setCreatedSecurePayments(state ,createdSecurePayments){
    state.createdSecurePayments = createdSecurePayments
  },
  setMarried(state , married){
    state.user.profile.marital_status = married
  },
  setSheba(state, data) {
    state.user.profile = {
      ...state.user.profile , [data.name] : data.value
    }
  }
};
export const actions = {
  setUser({commit}, user) {
    commit('setUser', user);
  },
  setToken({commit}, token) {
    this.$cookies.set('token', token);
    commit('setToken', token);
  },
  me(context) {
    return this.$axios.get('/user/me')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setUser', res.data.data);
          return Promise.resolve(res.data.data)
        }
      })
  },
  setSettings(context, settings) {
    return this.$axios.put('/settings', settings)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setSettings', settings);
          return Promise.resolve(res.data)
        }
      })
  },
  register(context, registerData) {
    return this.$axios.post('/register', registerData)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          // commit('setUser', res.user)
          // commit('setToken', res.token)
          context.commit('setEmail', registerData.email)
          // this.$cookies.set('token', res.token);
          return Promise.resolve()
        }
      })
  },
  login(context, loginData) {
    return this.$axios.post('/login', loginData)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setUser', res.data.user);
          context.commit('setToken', res.data.token);
          this.$axios.setHeader('Authorization', `Bearer ${res.data.token}`)
          if(loginData.rememberMe){
            this.$cookies.set('token', res.data.token);
          } else {
            this.$cookies.set('token', res.data.token, {
              maxAge: 3600
            });
          }
          return Promise.resolve(res.data.user)
        }
      })
      .catch(err=>{
        return Promise.reject(err);
      })
  },
  followUser(context, followDetails) {

    return this.$axios.post('/user/follow', followDetails)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve()
        }
      })
  },
  unFollowUser(context, followDetails) {

    return this.$axios.post('/user/unfollow', followDetails)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve()
        }
      })
  },
  showNotification(context) {
    return this.$axios.get('/user/notifications')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setNotification' , res.data.data)
          return Promise.resolve(res.data.data)
        }
      })
  },
  getPageinationNotifs(context , page) {
    return this.$axios.get(`/user/notifications?page=${page}`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setPageinationNotifs' , res)
          return Promise.resolve(res)
        }
      })
  },
  resetNotifications(context) {
    return this.$axios.post(`/user/notifications`, {})
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(true)
        }
      })
      .catch(() => {
        return Promise.reject(false)
      })
  },
  showNotificationAdmin(context) {
    return this.$axios.get('/admin/notifications')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setNotificationAdmin' , res.data.data)
          return Promise.resolve(res.data.data)
        }
      })
  },
  showDisputes(context) {
    return this.$axios.get('/user/disputes')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setDisputes' , res.data.open)
          context.commit('setCloseDisputes' , res.data.close)
          return Promise.resolve(res.data.data)
        }
      })
  },
  sendEmail(context, loginData) {
    return this.$axios.post('/password/email', loginData)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')

        } else {
          return Promise.resolve(res.data)
        }
      })
      .catch(err=>{
        return Promise.reject(err)
      })
  },
  changePassword(context, loginData) {
    return this.$axios.post('/password/change', loginData)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')

        } else {
          return Promise.resolve(res.data)
        }
      })
      .catch(err=>{
        return Promise.reject(err)
      })
  },
  checkToken(context, loginData) {
    return this.$axios.post('/password/check', loginData)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(res.data)
        }
      })
      .catch(err=>{
        return Promise.reject(err)
      })
  },
  requestChangePassword(context, loginData) {
    return this.$axios.post('/password/change', loginData)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')

        } else {
          return Promise.resolve(res.data)
        }
      })
      .catch(err=>{
        return Promise.reject(err)
      })
  },
  ChangePassword1(context, registerData) {
    return this.$axios.put('/user/password', registerData)
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
  sheba(context, registerData) {
    return this.$axios.put('/user/sheba', registerData)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(res.data.data)
        }
      })
      .catch(err=>{

      })
  },
  getCreatedSecurePayments(context) {
    return this.$axios.get('/user/payments/created')
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setCreatedSecurePayments', res.data.data)
          return Promise.resolve(res.data.data)
        }
      })
      .catch(err=>{

      })
  },
  exit(context){
    context.commit('setToken' ,null)
    context.commit('setUser' , null)
    this.$cookies.set('token', null);
    this.$cookies.set('rememberMe', null);
  },
  verifyEmail(context , id , hash) {
    return this.$axios.get('/email/verify/' + id + '/' + hash)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(res.data)
        }
      })
      .catch(err=>{
        return Promise.reject(err)
      })
  },
}
export const getters ={
  token(state){
    return state.token
  },
  user(state){
    return state.user
  },
  getEmail(state){
    return state.email
  },
  login(state){
    return state.user
  },
  getNotifications(status) {
    return status.notification
  },
  getBalance(state){
    return state.user?.balance || 0
  },
  getSettings(state){
    return state.settings
  },
  showDisputes(state){
    return state.disputes
  },
  showCloseDisputes(state){
    return state.closeDisputes
  },
  getCreatedSecurePayments(state){
    return state.createdSecurePayments
  },
  getNotificationAdmin(state){
    return state.NotificationAdmin
  },
  getPageinationNotifs(state){
    return state.pageinationNotifs
  }
};
