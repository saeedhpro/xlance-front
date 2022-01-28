<template>
<div class="p-4 relative mt-10 bg-white rounded-lg shadow-lg">
  <div class="pb-2 mb-5 flex border-b-2 border-gray-300">
    <div class="pb-3 text-sm text-gray-500 ir-medium text-lg"  @click="status='1'" :class="{'select' : status==='1'}">شبکه اجتماعی</div>
  </div>
  <div  class="border-b-2 border-dashed border-gray-400 pb-3" v-show="getStories.length>0">
      <StorySocial/>
  </div>
  <div class="border-b-2 border-dashed border-gray-400 pb-3">
    <Inf :number="getFollowers.length  | toPersianNumber" :url="url1" :btnName="btnName1">
      <img slot="img-inf" src="/images/users.png"/>
      <div slot="head-inf">شما را دنبال می‌کنند</div>
      <div slot="head2-inf">(شما {{getFollowing.length}} نفر را دنبال می‌کنید)</div>
      <div slot="name-inf">نفر</div>
    </Inf>
  </div>
  <div class="border-b-2 border-dashed border-gray-400 pb-3">
    <Inf :number="getMyStories.length  | toPersianNumber" :url="url2" :btnName="btnName2">
      <img slot="img-inf" src="/images/circle.png"/>
      <div slot="head-inf">استوری های شما</div>
<!--      <div slot="head2-inf">(۵ ستاره در یک ماه اخیر)</div>-->
      <div slot="name-inf">استوری</div>
    </Inf>
  </div>
  <div class="border-b-2 border-dashed border-gray-400 pb-3">
    <Inf2 :number="getMyPost.length  | toPersianNumber" :url="url3" :btnName="btnName3" :url2="url23" :btnName2="btnName23">
      <img slot="img-inf" src="/images/square.png"/>
      <div slot="head-inf">پست های شما</div>
<!--      <div slot="head2-inf">(۵ پست در یک ماه اخیر)</div>-->
      <div slot="name-inf">پست</div>
    </Inf2>
  </div>
  <div class="my-10 flex">
    <div class="mx-1 flex flex-wrap">
<!--      <PostFormat v-for="(p , i ) in getMyPost" :key="i" :post="p" class="w- h-64"/>-->
      <nuxt-link :to="`/socialMedia/${p.id}`" v-for="(p , i ) in getMyPost" :key="i" class="flex flex-wrap">
<!--        <img class="w-32 h-32 m-1 rounded-lg shadow-lg" :key="i" :post="p" :src="p.media.path"/>-->
      </nuxt-link>
    </div>
  </div>
</div>
</template>

<script>
    import Inf from "../global/Inf";
    import Inf2 from "../global/Inf2";
    import StorySocial from "../../StorySocial";
    import PostFormat from "../socialMedia/PostFormat";

    export default {
        name: "SocialNetworks",
        components: {PostFormat, StorySocial, Inf,Inf2,},
        data(){
            return{
                status:'1',
                model: null,
                url1:'/socialMedia',
                btnName1:'مشاهده صفحه من',
                url2:'/stories/create',
                btnName2:'استوری جدید',
                url3:'/posts/create',
                btnName3:'پست جدید',
                url23:'/posts',
                btnName23:'مشاهده پست ها',
                items:[]

            }
        },
      mounted() {
        this.$store.dispatch('socillMedia/getMyPosts')
        this.$store.dispatch('socillMedia/getMyStories')
        this.$store.dispatch('socillMedia/getFollowers')
        this.$store.dispatch('socillMedia/getFollowing')
      },
      computed:{
            getMyPost(){
                return this.$store.getters['socillMedia/getMyPosts']
            },
            getMyStories(){
                return this.$store.getters['socillMedia/getMyStories']
            },
            getFollowers(){
                return this.$store.getters['socillMedia/getFollowers']
            },
            getFollowing(){
                return this.$store.getters['socillMedia/getFollowing']
            },
          user(){
              return this.$store.getters['user/user']
          },
        getStories(){
          return this.$store.getters['socillMedia/getStories']
        },
        },
        methods:{
            addToItems(id) {
                this.items.push(id);
            },
        }
    }
</script>
