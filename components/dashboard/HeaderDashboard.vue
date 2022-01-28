<template>
  <div class="w-full py-3 px-5 justify-between align-center flex bg-white shadow-lg"
       style="position: fixed; top: 0;z-index: 999">
    <div class="flex align-center ">
      <div class="ml-8 mb-5">
        <Navbar/>
      </div>
      <div class="w-8 h-8 mx-3 bg-purple-600 rounded-full">
        <img :src="user.profile.avatar_accepted && user.profile.avatar ? user.profile.avatar.path :
             'images/logo.png'"
             v-if="user.profile"  class="w-4 h-4 w-full h-full rounded-full"/>
<!--        <img src="/images/logo.png" v-else class="p-1 w-full h-full "/>-->
      </div>
      <p class="text-sm text-black ir-medium mt-1">{{user.username}}</p>
    </div>
    <div class="hidden sm:flex">
      <CreateProject/>
      <img src="/images/logo.png" class="mx-5 w-8 h-8"/>
      <ListProject :user="user"/>
    </div>
    <div class="flex justify-end">
      <nuxt-link to="/announcements" class=" p-2  justify-center bg-gray-300 rounded-lg items-center flex click" style="max-width: 95px;
height: 32px;">
        <span v-if="notifications > 0" class="text-center h-6 w-6 bg-primary text-white rounded-lg">{{notifications | toPersianNumber }}</span>
        <span v-else>
        <i class="far fa-bell" ></i>
       </span>
        <span class="sm:mx-2 text-sm text-black sm:flex hidden">اعلانات </span>
      </nuxt-link>
      <nuxt-link to="/messages" class=" p-2 h-8 justify-center mr-5 bg-gray-300 rounded-lg items-center flex click" style="max-width: 95px;
height: 32px;">
        <span v-if="messages > 0" class="text-center h-6 w-6 bg-primary text-white rounded-lg">{{messages | toPersianNumber }}</span>
        <span v-else>
<!--          <i class="far fa-comment-alt"></i>-->
          <img class="w-4" src="../../static/images/message-square.svg"/>
        </span>
        <span class="sm:mx-2 mx-1 text-sm text-black sm:flex hidden">پیام ها</span>
      </nuxt-link>
    </div>
    <client-only>
      <vue-snotify></vue-snotify>
    </client-only>
  </div>
</template>
<script>
    import Navbar from "./Navbar";
    import CreateProject from "./global/CreateProject";
    import ListProject from "./global/ListProject";
    export default {
      name: "HeaderDashboard",
      components: {ListProject, CreateProject, Navbar},
      mounted() {
        this.connectEcho();
        this.$store.dispatch('chat/getNewMessages')
      },
      methods: {
        connectEcho() {
          const route = this.$route.name;
          window.Echo.channel(`new.message.notification.${this.user.id}`)
            .listen('NewMessageNotificationEvent', (e) => {
              // if(route !== 'messages') {
              //   this.$store.dispatch('chat/addNewMessages');
              // }
              this.$store.commit('chat/setNewMessages', {
                nonce : e.nonce ,
                count : e.count
              })
            });
          window.Echo.channel(`new.notifications.${this.user.id}`)
            .listen('NewNotificationEvent', (e) => {
              if(route !== 'announcements') {
                this.$store.commit('chat/newNotifications',{
                  nonce : e.nonce ,
                  count : e.count
                });
              }
            });
        }
      },
      computed:{
            user(){
                return this.$store.getters['user/user']
            },
            notifications() {
                return this.$store.getters['chat/getNewNotifications']
            },
            messages() {
                return this.$store.getters['chat/getNewMessages']
            }
        },
    }
</script>
