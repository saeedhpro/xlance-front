<template>
  <div class="container py-2 px-10 bg-white rounded-lg shadow-lg">
    <div class="pb-2 flex border-b-2 border-gray-300">
      <div class="pb-3 text-sm text-gray-500 ir-medium text-lg"  @click="status='1'" :class="{'select' : status==='1'}">پیام ها </div>
    </div>
    <div style="height: 840px" class="flex flex-row flex-wrap overflow-y-auto">
      <div class="flex-col sm:flex sm:flex-col w-full md:w-1/4 sm:p-3 sm:border-l-2 sm:border-gray-400 conversation-list" :class="{'active': conversation == null}">
        <div class="my-3">
          <div class="mb-4 flex relative">
            <div><i class="far fa-search absolute text-gray-500 mt-4 mr-2"></i></div>
            <input type="search" class="w-full px-3 pr-8 border-solid border-gray-400 border-2 bg-gray-100 rounded-lg placeholder-gray-500" placeholder="جستجو" style="height: 48px"/>
          </div>
          <v-card
            elevation="16"
            max-width="400"
            class="mx-auto "
          >
            <v-virtual-scroll
              :bench="benched"
              :items="conversations"
              min-height="400"
              max-height="725"
              item-height="80"
            >
              <template v-slot:default="{ item }">
                <v-list-item :key="item.id"
                             @click="chooseConversation(item)"
                             class="conversation-box click border-b-2 border-dashed"
                             :class="conversation && conversation.id === item.id ? 'selected1' : ''">
                  <v-list-item-content>
                    <v-list-item-title
                      class="flex"
                      style="align-items: center;"
                    >
                      <div>
                        <img alt=""  :src="item.user.id === user.id ? item.to.profile.avatar ? item.to.profile.avatar.path : '/images/logo.png' : item.user.profile.avatar ? item.user.profile.avatar.path : '/images/logo.png'" class="w-12 h-10 rounded-full">
                      </div>
                      <div class="conversation-username" style="align-items: center">
                        <div class="ir-medium">{{`${item.user.id === user.id ? item.to.username : item.user.username}`}}</div>
                        <span v-if="item.new_messages_count > 0" class="text-center h-4 w-4 bg-primary text-white rounded-lg">{{item.new_messages_count | toPersianNumber }}</span>

                        <div class="time text-gray-400 text-sm ir-light text-left" style="font-size: 10px">{{$moment(item.created_at).format('jYYYY/jM/jDD ')}}</div>
                        <!--                        <span class="time">{{$moment(item.created_at).format('HH:mm jYYYY/jM/jDD ')}}</span>-->
                      </div>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-virtual-scroll>
          </v-card>
        </div>
      </div>
      <div class="w-full md:w-3/4 message-list" :class="{'active': conversation != null}">
        <div class="w-full h-auto px-4 py-4 bg-gray-300">
          <div v-if="conversation" class="flex justify-space-between align-center">
            <div class="flex flex-wrap justify-start items-center">
              <img style="height: 40px; width: 40px" :src="conversation.user.id === user.id ? conversation.to.profile.avatar ? conversation.to.profile.avatar.path : '/images/logo.png' : conversation.user.profile.avatar ? conversation.user.profile.avatar.path : '/images/logo.png'" class="rounded-full">
              <span class="ir-medium mr-5">{{`${conversation.user.id === user.id ? conversation.to.username : conversation.user.username}`}}</span>
              <div class="w-64 h-10 py-2 mx-auto md:mt-0 mt-2  bg-gray-100 rounded-lg text-center align-center">
                <span class="py-auto ir-light">{{`${conversation.project ? conversation.project.title: ''}`}}</span>
              </div>
            </div>
            <div @click="showMessageList" class="-mt-16 text-gray-600 md:hidden flex" style="align-items: center">
              <span class="ml-1 text-sm">بازگشت</span>
              <i class="fal fa-arrow-alt-left"></i>
            </div>
          </div>
        </div>
        <div ref="messagesContainer" class="p-5 messages-box" >
          <chat-message :file="m.file" :type="m.type" :created_at="m.created_at" :d="user.id + ' === ' + m.user.id" :float="user.id != m.user.id" v-for="(m , i) in messages"  :key="i" :body="m.body"/>
        </div>
        <div class="p-5 send-message" >
          <div class="send-message-box flex-wrap">
            <textarea ref="body" type="text"
                     v-model="body" :disabled="conversation && conversation.status == 'closed' && conversation.type == 'project' && conversation.project.employer.id != user.id"> </textarea>
            <div>
            <a @click.prevent="sendFileMessage" class="upload-file click">
              <i class="fal fa-upload"></i>
            </a>
            <input
              ref="uploader"
              class="upload-input"
              type="file"
              hidden
              accept="image/*,.pdf"
              @change="selectFiles()"
            >
            <button @click="sendMessage('text')" class="w-64 h-10 p-1 ir-medium  rounded-lg bg-greentype text--white">ارسال</button>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import ChatMessage from "../../components/chat/ChatMessage";
    import SearchInput from "../../components/dashboard/global/SearchInput";

    export default {
        name: "index",
        components: {SearchInput, ChatMessage},
        layout:'dashboard',
        middleware:'auth',
        data() {
            return {
                status:'1',
                ws: null,
                file_tmp: null,
                file: null,
                benched: 0,
                body: null,
            }
        },
      head(){
        return {
          title: 'پیام ها'
        }
      },
        async mounted() {
          this.$store.commit('chat/setConversations' , [])
            this.$nextTick(async () => {
                this.$nuxt.$loading.start()
                await this.initEcho();
                await this.$store.dispatch('chat/resetMessagesNotif')
                this.$nuxt.$loading.finish()
            })
        },
        methods: {
            initEcho() {
                this.getConversations();
                this.setConversation(null);
                this.connectEchoConversation();
            },
            getConversations(){
                this.$store.dispatch('chat/getConversations');
                this.setConversation(null);
                this.connectEcho();
            },
            initSocket() {
                this.ws = new WebSocket('wss://chat.xlance.ir', this.$cookies.get('token'));
                // this.ws = window.io('wss://chat.xlance.ir', {
                //     transports: ['websocket'],
                //     token: this.$cookies.get('token')
                // });
                this.ws.onopen = () => {
                    this.ws.send(JSON.stringify({ task: 'GET_CONVERSATIONS', data: {} }))
                    this.ws.onmessage = evt => {
                        const data = JSON.parse(evt.data)
                        switch (data.task) {
                            case "LIST_CONVERSATIONS":
                                this.$store.dispatch('chat/setConversations', data.data);
                                setTimeout(()=>{
                                    this.scrollToEnd()

                                }, 800)
                                break;
                            case "LIST_MESSAGES":
                                this.$store.dispatch('chat/setMessages', data.data);
                                setTimeout(()=>{
                                    this.scrollToEnd()

                                }, 800)
                                break;
                            case "NEW_MESSAGE":
                              const m = data.data;
                              this.$store.dispatch('chat/addMessage', m);
                                if(this.conversation && this.conversation.id == m.conversation.id)
                                {
                                  this.$store.dispatch('chat/seenMessage' , {
                                    message_id : m.id
                                  });
                                }
                                else {
                                  this.$store.dispatch('chat/setConversationNewMessagesCount' , m )
                                }
                                setTimeout(()=>{
                                    this.scrollToEnd()

                                }, 800)
                                break;
                        }
                    }
                }
                this.ws.onclose = async () => {
                    await setTimeout(()=>{}, 500);
                    this.initSocket();
                }
                this.ws.onerror = async (error) => {
                }
            },
            chooseConversation(conversation) {
                this.setConversation(conversation);
                this.$refs.body.focus();
                // this.connectEchoConversation(conversation);
              setTimeout(()=>{
                this.scrollToEnd();
              }, 300)
            },
            setConversation(conversation) {
              this.$store.dispatch('chat/setConversation', conversation)
              if(conversation) {
                this.$store.dispatch('chat/seenConversation', {
                  conversation_id: conversation.id
                })
                this.$store.dispatch('chat/getMessages' , conversation.id)
              }
            },
            connectEcho() {
                window.Echo.channel(`new.conversations.${this.user.id}`)
                    .listen('NewConversationEvent', (e) => {
                        this.$store.dispatch('chat/addConversation', e.conversation)
                    });
            },
            connectEchoConversation() {
              const t = `conversation.message.${this.user.id}`
                window.Echo.channel(t)
                    .listen('NewMessageEvent', (e) => {
                        this.$store.dispatch('chat/addMessage', e.message);
                      setTimeout(()=>{
                        this.scrollToEnd();
                      }, 300)
                        if(!(this.conversation && this.conversation.id == e.message.conversation.id)){
                          this.$store.dispatch('chat/setConversationNewMessagesCount', e.message);
                        }
                    });
            },
            sendMessage(type) {
                if(!this.conversation || (this.conversation.status == 'closed' && this.conversation.employer.id != this.user.id) ) {
                    return
                }
                const data = {
                    conversation_id: this.conversation.id,
                    body: type === 'text' ? this.body : 'none',
                    type: type,
                    upload_id: this.file ? this.file.id : null,
                    to_id: this.user.id === this.conversation.user.id ? this.conversation.to.id : this.conversation.user.id
                };
                this.$store.dispatch('chat/sendMessage', data)
                .then(()=>{
                })
                .catch(async err=>{
                  const keys = Object.keys(err.response.data.errors);
                  for (let i = 0; i < keys.length; i++){
                    for (let j = 0; j < err.response.data.errors[keys[i]].length; j++){
                      await this.$snotify.error(err.response.data.errors[keys[i]][j], {
                        timeout: 2000,
                        showProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true
                      })
                    }
                  }
                });
                this.body = '';
                // setTimeout(()=>{
                //     this.scrollToEnd();
                // }, 800)
            },
            openUploader() {
                this.$refs.uploader.click();
            },
            selectFiles() {
                this.file_tmp = this.$refs.uploader.files[0];
                this.uploadFile();
            },
            async uploadFile() {
                const dataForm = new FormData();
                dataForm.set('file', this.file_tmp);
                this.file = await this.$store.dispatch('account/uploadImage', dataForm);
                this.sendMessage('file');
            },
            sendFileMessage() {
                if(!this.conversation || (this.conversation.status == 'closed' && this.conversation.employer.id != this.user.id)) {
                    return
                }
                this.openUploader();
            },
            sendMessageByWs() {
              if (!this.conversation || (this.conversation.status == 'closed' && this.conversation.employer.id != this.user.id)){
                return
              }
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
            showMessageList() {
                this.$store.dispatch('chat/setConversation', null)
            }
        },
        computed: {
            conversations: {
              get() {
                return this.$store.getters['chat/getConversations'];
              }
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
  @media only screen and (max-width: 768px) {
    .conversation-list {
      display: none;
      &.active {
        display: block;
      }
    }
    .message-list {
      display: none;
      &.active {
        display: block;
      }
    }
  }
  .conversation-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &.selected1 {
      background: #EBFFF7 0% 0% no-repeat padding-box;
    }
    .conversation-username {
      width: 100%;
      padding-right: 20px;
      direction: rtl;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      span {

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
        width: calc(100% - 183px);
        height: 80px;
        padding: 8px 16px;
        font: normal normal bold 16px/32px IRANSans;
        letter-spacing: 0px;
        outline: none;
      }
      .upload-file {
        margin: 0 15px;
      }
      button {
        height: 50px;
        width: 120px;
        background: #00C379 0% 0% no-repeat padding-box;
        box-shadow: 0px 2px 16px #00C37966;
        border-radius: 8px;
        text-align: center;
        font: normal normal bold 16px/32px IRANSans;
        letter-spacing: 0px;
        color: #FFFFFF;
      }
    }
  }
  .v-list-item {
    padding: unset!important;
  }
</style>
