<template>
  <div class="container">
    <div class="p-3 mb-2 flex border-solid border-2 border-gray-500 justify-between rounded-lg bg-gray-100" v-if="loggedInUser && freelancer && loggedInUser.id === freelancer.id">
      <div class="text-gray-700">پروفایل شما از دید دیگر کاربران</div>
      <div>
        <nuxt-link to="/account" class="px-2 border-solid border-2 border-greenFreelancer rounded-lg text-greenFreelancer ir-medium text-sm">ویرایش پروفایل</nuxt-link>
      </div>
    </div>
    <div v-if="freelancer">
    <div class="w-full h-56">
      <img class="w-full h-56":src="freelancer.profile.bg_accepted ? freelancer.profile.bg.path :
             '/images/Background@2x.png'"
           v-if="freelancer.profile"/>
<!--      <img class="w-full h-56" v-else src="/images/Background@2x.png"/>-->
    </div>
  <div class=" mt-10 flex fl">
    <div class="py-10 px-3 bg-white shadow-md rounded-lg text-center flex flex-col stick" style="width: 280px;
height: 516px;">
      <img  :src="freelancer.profile.avatar_accepted ? freelancer.profile.avatar.path :
             'images/logo.png'"
            v-if="freelancer.profile"  class="w-32 h-32 mx-auto rounded-full">
<!--      <img src="/images/Logo.png" v-else class="w-32 h-32 mx-auto rounded-full">-->
      <div class="my-4 text-lg text-gray-700 ir-medium">{{freelancer.username}}</div>
        <div class="mb-2 text-sm text-gray-400">{{freelancer.profile.position || 'تکمیل نکرده'}}</div>
      <div class="mx-auto">
        <rating-component :value="freelancer.rate" :maxStars="5" :hasCounter="true" class="rate_size hover:none" :dis="true"/>
      </div>
      <div class="my-5 flex">
        <div class="border-l-2 border-gray-400 flex flex-col"  style="height: 50px!important">
          <div class="ir-bold text-gray-700">{{freelancer.finished_projects}}</div>
          <div class="ir-light text-sm text-gray-700">پروژه انجام شده</div>
        </div>
        <div class="px-3 flex flex-col"  style="height: 50px!important">
          <div class="ir-bold text-gray-700">{{freelancer.followers_count}}</div>
          <div class="ir-light text-sm text-gray-700">دنبال کننده</div>
        </div>
        {{freelancer.followers}}
      </div>
      <div v-if="freelancer && loggedInUser && (freelancer.id !== loggedInUser.id)" class="my-5">
        <div v-if="!freelancer.followed" @click="followUser(freelancer.id)" class="click w-full py-2 text-md rounded-lg text-greenFreelancer border-greenFreelancer border-solid border-2">
          <i class="fal fa-user-plus ml-2"></i>
          دنبال کن
        </div>
        <div v-else @click="unFollowUser(freelancer.id)" class="click w-full py-2 text-md rounded-lg text-greenFreelancer border-greenFreelancer border-solid border-2">
          <i class="fal fa-check ml-2"></i>
          دنبال میکنید
        </div>
      </div>
      <div v-if="freelancer && loggedInUser && (freelancer.id !== loggedInUser.id)">
        <nuxt-link :to="`/createProject?id=${freelancer.id}`" class="block w-full py-2 text-sm rounded-lg text-white bg-greenFreelancer shadow-lg">
          <i class="fal fa-suitcase ml-2"></i>
          ایجاد پروژه برای این فریلنسر
        </nuxt-link>
      </div>
    </div>
    <div class="w-4/5">
      <div class="mr-20 text-gray-600">{{freelancer.profile.description}}</div>
      <div class="mr-20 my-5 px-5 py-2 bg-gray-100 rounded-lg">
        <div class="flex flex-wrap">
        <div v-for="(skill , index) in freelancer.skills">
          <div class="p-1 m-1 bg-purple-200 rounded text-purple-600" >{{skill.name}}</div>
        </div>
        </div>
      </div>
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
            <div class="text-gray-600 ir-bold">نظرات کارفرمایان</div>
          </div>
        </div>
        <div class="mb-5 pb-3 flex flex-wrap justify-between items-center border-b-2 border-gray-400" v-for="(i , p) in getCommentKarfarma" :key="p">
          <div class="flex flex-wrap">
            <div>
              <img class="w-20 h-20 rounded-full" :src="i.rater.profile.avatar ? i.rater.profile.avatar.path : '/images/Logo.png'">
              <div class=" mt-3 text-gray-600">{{i.rater.username}}</div>
            </div>
            <div class="mr-2">
              <div class=" text-sm text-gray-600">{{i.description}}</div>
              <div class="my-2 text-greenFreelancer">{{i.project.title}}</div>
            </div>
          </div>
          <div class="text-center">
            <div class="mr-3 text-sm text-gray-600">{{ $moment(i.created_at).format('jYYYY/jM/jDD') }}</div>
            <rating-component :value="i.rate" :maxStars="5" :hasCounter="false" class="rate_size hover:none" :dis="true"/>
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
<!--        <PostFormat :date="true" v-for="(p, i) in freelancer.posts" :key="i" :post="p"/>-->
<!--        <PostFormat v-for="(p, i) in freelancer.posts" :key="i" :post="p"/>-->
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
    import ShowSelect from "../../components/dashboard/Profile/ShowSelect";
    import PostFormat from "../../components/dashboard/socialMedia/PostFormat";
    import RatingComponent from "../../components/RatingComponent";
    export default {
        name: "ShowProfile",
        middleware:'auth',
        components: {PostFormat, ShowSelect,RatingComponent},
        layout:'defaultDash',
        async mounted(){
            this.$nextTick(async () => {
                this.$nuxt.$loading.start()
                this.getFreelancer();
                this.$nuxt.$loading.finish()
            })
         await this.$store.dispatch('freelancer/getPost' , this.$route.params.id)

        },
        methods: {
            getFreelancer() {
                this.$store.dispatch('freelancer/getUser', this.$route.params.id)
            },
            followUser(id) {
                this.$store.dispatch('freelancer/setFollowed', true)
                this.$store.dispatch('user/followUser', {'user_id': id})
            },
            unFollowUser(id) {
                this.$store.dispatch('freelancer/setFollowed', false)
                this.$store.dispatch('user/unFollowUser', {'user_id': id})
            },
        },
      head(){
        return {
          title: 'پروفایل کاربر'
        }
      },
        computed:{
            freelancer(){
                return this.$store.getters['freelancer/getFreelancer']
            },
            loggedInUser(){
                return this.$store.getters['user/user']
            },
            getCommentKarfarma(){
                return this.$store.getters['freelancer/getCommentKarfarma']
            },
          userPost(){
              return this.$store.getters['freelancer/getAllPosts']
          }
        },
    }
</script>
