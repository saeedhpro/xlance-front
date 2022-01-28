<template>
  <div class="container">
    <div class="p-2 mb-3 flex justify-between rounded-lg bg-gray-100 border-solid border-2 border-gray-400" v-if="loggedInUser && getEmployer && loggedInUser.id === getEmployer.id">
      <div class="text-gray-700">پروفایل شما از دید دیگر کاربران</div>
      <div>
        <nuxt-link to="/account" class="px-1 border-solid border-2 border-greenFreelancer rounded-lg text-greenFreelancer text-sm">ویرایش پروفایل</nuxt-link>
      </div>
    </div>
    <div v-if="getEmployer">
    <div>
      <img class="w-full h-56":src="getEmployer.profile.bg_accepted ? getEmployer.profile.bg.path :
             '/images/Background@2x.png'"
           v-if="getEmployer.profile" />
<!--      <img class="w-full h-32" v-else src="/images/Background@2x.png"/>-->
    </div>
  <div class=" mt-10 flex fl">
    <div class="py-10 px-3 h-auto bg-white shadow-xl rounded-lg text-center flex flex-col stick" style="width: 280px; height: 516px;">
      <img :src="getEmployer.profile.avatar_accepted ? getEmployer.profile.avatar.path :
             'images/logo.png'"
           v-if="getEmployer.profile"  class="w-32 h-32 mx-auto rounded-full">
<!--      <img src="/images/Logo.png" v-else class="w-32 h-32 mx-auto rounded-full">-->
      <div class="my-4 text-lg text-gray-700 ir-medium">{{getEmployer.username}}</div>
        <div class="mb-2 text-sm text-gray-400">{{getEmployer.profile.position || 'تکمیل نکرده'}}</div>
      <div class="flex">
        <div class="px-3 border-l-2 border-gray-400 flex flex-col" style="height: 50px!important">
          <div class="ir-bold text-gray-700">{{getEmployer.published_projects}}</div>
          <div class="ir-light text-sm text-gray-700">پروژه ساخته شده</div>
        </div>
        <div class="px-3 flex flex-col" style="height: 50px!important">
          <div class="ir-bold text-gray-700">{{getEmployer.following || 0}}</div>
          <div class="ir-light text-sm text-gray-700">دنبال کننده</div>
        </div>
      </div>
      <div v-if="getEmployer && loggedInUser && (getEmployer.id !== loggedInUser.id)" class="my-5">
        <div  v-if="!getEmployer.followed" class="w-full py-2 text-md rounded-lg text-greenFreelancer border-greenFreelancer border-solid border-2">
          <i class="fal fa-user-plus ml-2"></i>
          دنبال کن
        </div>
        <div v-else @click="unFollowUser(getEmployer.id)" class="w-full py-2 text-md rounded-lg text-greenFreelancer border-greenFreelancer border-solid border-2">
          <i class="far fa-check ml-2"></i>
          دنبال میکنید
        </div>
      </div>
    </div>
    <div class="w-4/5">
      <div class="md:mr-20 mr-0 text-gray-600">{{getEmployer.profile.description}}</div>
      <div>
        <ShowSelect/>
      </div>
      </div>
    </div>
      <div class="mt-20">
        <div class="mb-10 flex">
          <div>
            <img src="/images/art2.png"/>
          </div>
          <div class="mr-3">
            <div class="text-gray-600 ir-bold">پست ها</div>
          </div>
        </div>
<!--        <PostFormat :date="true" v-for="(p, i) in getEmployer.posts" :key="i" :post="p"/>-->
        <div class="flex flex-wrap justify-start" >
          <PostFormat :post="p" :key="i" v-for="(p , i) in userPost"/>
        </div>
<!--        <div class="text-center">-->
<!--          <nuxt-link to="/"  class="px-5 py-1 border-2 border-gray-600 text-gray-600 rounded-lg">مشاهده بیشتر</nuxt-link>-->
<!--      </div>-->
      </div>
    </div>
    </div>
</template>
<script>
   import ShowSelect from "../../components/employer/ShowSelect";
    import PostFormat from "../../components/dashboard/socialMedia/PostFormat";
    export default {
        mounted(){
            this.$store.dispatch('employer/getEmployer', this.$route.params.id)
             this.$store.dispatch('freelancer/getPost' , this.$route.params.id)

        },
        name: "ShowProfile",
        middleware:'auth',

        components: {PostFormat, ShowSelect},
        layout:'defaultDash',
        data(){
            return{
                rating: 4,
            }
        },
        methods: {
            // followUser(id) {
            //     this.$store.dispatch('user/followUser', {'user_id': id})
            //         .then(e=>{
            //         })
            //         .catch(e=>{
            //         })
            // },
            // unFollowUser(id) {
            //     this.$store.dispatch('user/unFollowUser', {'user_id': id})
            //         .then(e=>{
            //         })
            //         .catch(e=>{
            //         })
            // },
            followUser(id) {
                this.$store.dispatch('employer/setFollowed', true)
                this.$store.dispatch('user/followUser', {'user_id': id})
            },
            unFollowUser(id) {
                this.$store.dispatch('employer/setFollowed', false)
                this.$store.dispatch('user/unFollowUser', {'user_id': id})
            },
        },
        computed:{
            getEmployer(){
                return this.$store.getters['employer/getEmployer']
            },
            loggedInUser(){
                return this.$store.getters['user/user']
            },
          userPost(){
            return this.$store.getters['freelancer/getAllPosts']
          }
        },
      head(){
        return {
          title: 'پروفایل کاربر'
        }
      },
    }
</script>
