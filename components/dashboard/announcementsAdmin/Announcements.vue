<template>
  <div class="container">
    <div class="p-5 relative bg-white rounded-lg ">
      <div class="pb-2 mb-5  border-b-2 border-gray-300 flex justify-between">
        <div class="pb-3 text-sm text-gray-500 ir-medium text-lg"  @click="status='1'" :class="{'select' : status==='1'}">اطلاعیه ها</div>
        <div>
        </div>
      </div>
      <Loading/>
      <div
        v-if="getPageinationNotifs"
      >
        <notification
          v-for="(not, index) in getPageinationNotifs.data.data"
          :key="index"
          :id="not.id"
          :type="not.type"
          :content="not.content"
          :text="not.text ? not.text : not.title"
          :created-at="not.created_at"
        />
      </div>
      <pagination v-if="getPageinationNotifs" :limit="1" :data="getPageinationNotifs.data" @pagination-change-page="getResults"></pagination>

    </div>
  </div>
</template>

<script>
    import TabSelect from "../global/TabSelect";
    import Loading from "../../Loading";
    import Notification from "../../Notification";
    export default {
        loading: false,
        name: "Announcements",
        components: {Notification, Loading, TabSelect},

        data(){
            return{
                status:'1',
                color:'#00C379',
                size:'20px',
                isLoading: false,
                fullPage: true,
            }
        },
        async mounted(){
            this.$nextTick(async () => {
                this.$nuxt.$loading.start()
                await this.$store.dispatch('user/getPageinationNotifs' , this.$route.query.page || 1)
                const res = await this.$store.dispatch('user/resetNotifications');
                if(res) {
                  this.$store.commit('chat/newNotifications', {
                    nonce: null,
                    count: 0,
                  })
                }
                this.$nuxt.$loading.finish()
            })
        },
        computed:{
            getNotifications() {
                return this.$store.getters['user/getNotifications'];
            },
          getPageinationNotifs(){
              return this.$store.getters['user/getPageinationNotifs']
          },

        },
      methods:{
        getResults(page = 1) {
          this.$store.dispatch('user/getPageinationNotifs' , page)
        },
      }
    }
</script>
