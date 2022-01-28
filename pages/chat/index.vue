<template>
  <div class="container py-2 px-10 bg-white rounded-lg shadow-lg">
    <div class="pb-2 mb-2 flex border-b-2 border-gray-300">
      <div class="pb-3 text-sm text-gray-500 ir-medium">پیام ها</div>
    </div>
    <div style="height: 770px" class="flex">
      <div class="flex-col sm:flex sm:flex-col sm:w-1/4 sm:p-3 sm:border-l-2 sm:border-gray-400 ">
        <div class="my-3">
          <v-card
            elevation="16"
            max-width="400"
            class="mx-auto "
          >
            <v-virtual-scroll
              :bench="benched"
              :items="conversations"
              min-height="400"
              max-height="800"
              item-height="110"
            >
              <template v-slot:default="{ item }">
                <v-list-item :key="item.id">
                  <v-list-item-content>
                    <v-list-item-title
                      @click="chooseConversation(item)"
                      class="conversation-box click"
                      :class="conversation && conversation.id === item.id ? 'selected' : ''">
                      <img v-if="item.url" style="height: 40px; width: 40px" src="/images/logo.png" class="rounded">
                      <div class="conversation-username">
                        <span class="ir-medium">{{`${item.username}`}}</span>
                        <span class="time">{{$moment(item.created_at).format('jYYYY/jM/jDD')}}</span>
                      </div>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-virtual-scroll>
          </v-card>
        </div>
      </div>
      <div class="w-full sm:w-3/4">
        <div class="w-full h-20 px-4 py-4 bg-gray-300">
          <div v-if="conversation" class="flex justify-space-between">
            <div class="flex justify-start items-center">
              <img v-if="conversation.url" style="height: 40px; width: 40px" src="/images/logo.png" class="rounded">
              <span class="ir-medium mr-5">{{`${conversation.username}`}}</span>
            </div>
          </div>
        </div>
        <div ref="messagesContainer" class="p-5 messages-box" >
          <chat-message :created_at="m.created_at" :float="user.id === m.user.id" v-for="(m , i) in messages"  :key="i" :body="m.body"/>
        </div>
        <div class="p-5 send-message" >
          <div class="send-message-box">
            <textarea ref="body" type="text" v-model="body"> </textarea>
            <button @click="sendMessage" class="">ارسال</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChatMessage from "../../components/chat/ChatMessage";
export default {
  name: "index",
  components: {ChatMessage},
  layout:'account',
  middleware:'auth',
  head(){
    return {
      title: 'پیام ها'
    }
  },
  data() {
    return {
      ws: null,
      benched: 0,
      body: null,
    }
  },
  mounted() {
    this.initSocket();
  },
  methods: {
    initSocket() {
      this.ws = new WebSocket('ws://chat.xlance.ir', this.$cookies.get('token'));
      this.ws.onopen = () => {
        this.ws.send(JSON.stringify({ task: 'GET_CONVERSATIONS', data: {} }))
        this.ws.onmessage = evt => {
          const data = JSON.parse(evt.data)
          switch (data.task) {
            case "LIST_CONVERSATIONS":
              this.$store.dispatch('chat/setConversations', data.data);
              setTimeout(()=>{
                this.scrollToEnd()
              }, 100)
              break;
            case "LIST_MESSAGES":
              this.$store.dispatch('chat/setMessages', data.data);
              setTimeout(()=>{
                this.scrollToEnd()
              }, 100)
              break;
            case "NEW_MESSAGE":
              this.$store.dispatch('chat/addMessage', data.data);
              setTimeout(()=>{
                this.scrollToEnd()
              }, 100)
              break;
          }
        }
      }
      this.ws.onclose = async () => {
        await setTimeout(()=>{}, 500)
        this.initSocket();
      }
    },
    chooseConversation(conversation) {
      this.$store.dispatch('chat/setConversation', conversation)
      this.$refs.body.focus();
      this.ws.send(JSON.stringify({ task: 'GET_MESSAGES', data: {conversation_id: conversation.id} }))
    },
    sendMessage() {
      if(this.body) {
        this.ws.send(JSON.stringify({ task: 'SEND_MESSAGE', data: {
            conversation_id: this.conversation.id,
            user_id: this.user.id,
            type: 'text',
            body: this.body,
            to_id: this.conversation.to_id
        } }))
        setTimeout(() => {
          this.body = null;
          this.$refs.body.focus();
        }, 200)
      }
    },
    scrollToEnd () {
      const content = this.$refs.messagesContainer
      content.scrollTop = content.scrollHeight
    },
  },
  computed: {
    conversations() {
      return this.$store.getters['chat/getConversations']
    },
    conversation() {
      return this.$store.getters['chat/getConversation']
    },
    messages() {
      return this.$store.getters['chat/getMessages']
    },
    user() {
      return this.$store.getters['user/user']
    }
  }
}
</script>
<style scoped lang="scss">
  .conversation-box {
    display: flex;
    justify-content: space-between;
    padding: 24px;
    &.selected {
      background: #EBFFF7 0% 0% no-repeat padding-box;
    }
    .conversation-username {
      width: 100%;
      padding-right: 20px;
      direction: rtl;
      text-align: right;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      span {
        font-size: 14px;
        line-height: 32px;
        letter-spacing: 0;
        color: #212121;
      }
    }
  }
  .head-box {
    background-color: red;
    .conversation-username {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      span {
        font-size: 14px;
        line-height: 32px;
        letter-spacing: 0;
        color: #212121;
      }
    }
  }
  .messages-box {
    height: 100%;
    max-height: 600px;
    overflow-y: scroll;
  }
  .send-message {
    .send-message-box {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      textarea {
        background: #EEEEEE 0% 0% no-repeat padding-box;
        border: 1px solid #BDBDBD;
        border-radius: 8px;
        width: calc(100% - 150px);
        height: 50px;
        padding: 8px 16px;
        font: normal normal bold 16px/32px IRANSans;
        letter-spacing: 0px;
        outline: none;
      }
      button {
        height: 50px;
        width: 120px;
        background: #00C379 0% 0% no-repeat padding-box;
        box-shadow: 0px 8px 32px #00C37966;
        border-radius: 8px;
        text-align: center;
        font: normal normal bold 16px/32px IRANSans;
        letter-spacing: 0px;
        color: #FFFFFF;
      }
    }
  }
</style>
