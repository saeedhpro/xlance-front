
export const state = () =>({
  conversations:[],
  conversation: null,
  messages: [],
  newMessages: 0,
  newNotifications: 0,
  nonce:null
})

export const mutations ={
  setConversations(state,conversations){
    state.conversations = conversations
  },
  setConversation(state , conversation) {
    state.conversation = conversation
  },
  setConversationNewMessagesCount(state , count) {
    state.conversation.new_messages_count = count
  },
  setMessages(state , messages) {
    state.messages = messages
  },
  addMessage(state , message) {
    if(state.conversation && state.conversation.id == message.conversation_id)
    {
      const m = state.messages.find(i=> i.id == message.id )
      if(!m){
        state.messages.push(message)
      }
    }
  // else {
  //   const c = state.conversations.find(i => i.id == message.conversation.id)
  //   if(c){
  //     c.messages.push(message)
  //   }
  // }
  },
  addNewMessages(state) {
    state.newMessages = state.newMessages + 1
  },
  setNewMessages(state , data) {
    if(data.nonce == null){
      state.newMessages = data.count
    }
    else if (state.nonce != data.nonce){
      state.newMessages = data.count
      state.nonce = data.nonce
    }
  },
  newNotifications(state , data) {
    if(data.nonce == null){
      state.newNotifications = data.count
    }
    else if (state.nonce != data.nonce){
      state.newNotifications = data.count
      state.nonce = data.nonce
    }
  },
  addNewNotifications(state) {
    state.newNotifications = state.newNotifications + 1
  },
  addConversation(state, conversation) {
    state.conversations.push(conversation)
  },
  resetMessagesNotif(state){
    state.newMessages = 0
  },
  resetNotif(state){
    state.newNotifications = 0
  },
  setNonce(nonce){
    this.state.nonce = nonce
  }
}

export const actions = {
  getConversations(context) {
  return this.$axios.get(`/user/conversations`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setConversations', res.data.data)
          return Promise.resolve()
        }
      })
  },
  getMessages(context , id) {
  return this.$axios.get(`/user/conversations/${id}/messages`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setMessages', res.data.data)
          return Promise.resolve()
        }
      })
  },
  getNewMessages(context) {
  return this.$axios.get(`/user/messages/new`)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          context.commit('setNewMessages', {
            nonce : null,
            count : res.data
          })
          return Promise.resolve()
        }
      })
  },
  sendMessage(context, message) {
    return this.$axios.post(`/user/messages`, message)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(res.data)
        }
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },

  seenConversation(context, data) {
    return this.$axios.post('/conversations/seen', data)
      .then((res) => {
        context.commit('setConversationNewMessagesCount' , 0)
        return Promise.resolve(res)

      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  seenMessage(context, data) {
    return this.$axios.post('/messages/seen', data)
      .then((res) => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  setConversationNewMessagesCount(context, m) {
    const conversation = context.state.conversations.find(i=> i.id == m.conversation.id)
    if(conversation){
      context.commit('setConversationNewMessagesCount' , conversation.new_messages_count +1)
    }
  },

  setConversations(context, data) {
    context.commit('setConversations', data.reverse())
  },
  setMessages(context, data) {
    context.commit('setMessages', data)
  },
  setConversation(context, conversation) {
    context.commit('setConversation', conversation)
    if(!conversation) {
      context.commit('setMessages', [])
    }
  },
  addMessage(context, message) {
    context.commit('addMessage', message)
  },
  addNewMessages(context) {
    context.commit('addNewMessages')
  },
  addNewNotifications(context) {
    context.commit('addNewNotifications')
  },
  addConversation(context, conversation) {
    context.commit('addConversation', conversation)
  },
  resetMessagesNotif(context){
    context.commit('resetMessagesNotif')
  },
  resetNotif(context){
    context.commit('resetNotif')
  }
}

export const getters = {
  getConversations(state) {
    return state.conversations;
  },
  getConversation(state) {
    return state.conversation;
  },
  getMessages(state) {
    return state.messages;
  },
  getNewMessages(state) {
    return state.newMessages;
  },
  getNewNotifications(state) {
    return state.newNotifications;
  },
}
