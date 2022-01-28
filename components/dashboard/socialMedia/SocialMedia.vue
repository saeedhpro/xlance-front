<template>
  <div>
    <div>
  <div class="container bg-white rounded-lg shadow-lg">
    <div class="px-3">
    <div class="pb-2 mb-5 border-b-2 border-gray-300 justify-between">
      <div class="pb-3 w-40 text-sm text-gray-500 ir-medium text-lg"  @click="status='1'" :class="{'select' : status==='1'}">شبکه های اجتماعی</div>
    </div>
    <div class="pb-2 border-b-2 border-dashed border-gray-400" v-show="getStories.length>0">
      <StorySocial/>
    </div>
    <div class="px-5 py-2 flex flex-wrap justify-between">
      <div class="w-full sm:w-1/2 sm:border-l-2 sm:border-dashed sm:border-gray-400 md:pl-3 ">
        <div class="border-b-2 border-dashed border-gray-400 pb-3">
          <Inf :number="getFollowers.length | toPersianNumber" :url="url0" :btnName="btnName">
            <img slot="img-inf" src="/images/briefcase.png"/>
            <div slot="head-inf">دنبال کنندگان </div>
            <div slot="name-inf">نفر</div>
          </Inf>
        </div>
        <div class="border-b-2 border-dashed border-gray-400 pb-3 sm:border-none">
          <Inf :number="getMyStories.length | toPersianNumber" :url="url1" :btnName="btnName1">
            <img slot="img-inf" src="/images/file-text.png"/>
            <div slot="head-inf">استوری های شما</div>
            <div slot="name-inf">استوری</div>
          </Inf>
        </div>
      </div>
      <div class="w-full sm:w-1/2 sm:pr-3">
        <div class="border-b-2 border-dashed border-gray-400 pb-3 ">
          <Inf :number="getFollowing.length | toPersianNumber" :url="url2" :btnName="btnName2">
            <img slot="img-inf" src="/images/refresh-cw.png"/>
            <div slot="head-inf">دنبال شده ها توسط شما</div>
            <div slot="name-inf">نفر</div>
          </Inf>
        </div>
        <div>
          <Inf2 :number="getMyPost.length | toPersianNumber" :url="url" :btnName="btnName3" :url2="url3" :btnName2="btnName4">
            <img slot="img-inf" src="/images/briefcase.png"/>
            <div slot="head-inf">پست های شما</div>
            <div slot="name-inf">پست</div>
          </Inf2>
        </div>
      </div>
    </div>
    </div>
</div>
  <div class="container my-10 bg-white rounded-lg shadow-lg">
    <div class="px-3">
    <div class="pb-2 mb-5 ir-medium border-b-2 border-gray-300 justify-between">
      <div class="pb-3 w-20 text-sm text-gray-500 ir-medium text-lg"  @click="status='1'" :class="{'select' : status==='1'}">پست ها</div>
    </div>
    <div class="flex my-5 justify-between items-center">
      <div class="flex">
      <div>
        <img src="/images/art2.png"/>
      </div>
      <div class="mr-3">
        <div class="text-gray-700 ir-medium">دنبال شده ها</div>
      </div>
      </div>
      <div>
        <nuxt-link to="/posts" class="px-4 py-1  border-solid border-greenFreelancer border-2 text-greenFreelancer rounded-lg">مشاهده همه</nuxt-link>
      </div>
    </div>
    <div class="flex flex-wrap justify-start">
    <PostFormat :post="p" :key="i" v-for="(p ,i) in getPosts"/>
    </div>
    <div class="flex my-5 justify-between items-center">
      <div class="flex">
        <div>
          <img src="/images/art2.png"/>
        </div>
        <div class="mr-3">
          <div class="text-gray-700 ir-medium">پست های شما</div>
        </div>
      </div>
      <div>
        <nuxt-link to="/posts/myPost" class="px-4 py-1  border-solid border-greenFreelancer border-2 text-greenFreelancer rounded-lg">مشاهده همه</nuxt-link>
      </div>
    </div>
    <div class="flex flex-wrap justify-start">
      <PostFormat :post="p" :key="i" v-for="(p , i) in getMyPost"/>
    </div>
    <div class="flex  my-5 justify-between items-center">
      <div class="flex">
        <div>
          <img src="/images/art2.png"/>
        </div>
        <div class="mr-3">
          <div class="text-gray-700 ir-medium">ذخیره شده ها</div>
        </div>
      </div>
      <div>
        <nuxt-link to="/posts/save" class="px-4 py-1  border-solid border-greenFreelancer border-2 text-greenFreelancer rounded-lg">مشاهده همه</nuxt-link>
      </div>
    </div>
    <div class="flex flex-wrap justify-start" >
      <PostFormat :post="p" :key="i" v-for="(p , i) in getSavedPost"/>
    </div>
    </div>
  </div>
  </div>
  </div>
</template>

<script>
import StorySocial from "~/components/StorySocial";
    import Stories from "./Storis";
    import Inf from "../global/Inf";
    import Inf2 from "../global/Inf2";
    import PostFormat from "./PostFormat";
    export default {
        name: "SocialMedia",
        components: {PostFormat, Stories,Inf,Inf2,StorySocial},
        data(){
            return{
                benched: 0,
                menuStatus:null,
                showList:false,
                items:[],
                date:'2 روز پیش',
                url0:'/followers',
                url:'/posts/create',
                btnName:'مشاهده دنبال کننده ها',
                url1:'/stories/create',
                btnName1:'استوری جدید',
                url2:'/followers',
                btnName2:'مشاهده دنبال شده ها',
                url3:'/posts/myPost',
                btnName4:'مشاهده پست های من',
                btnName3:'پست جدید',
                status:'1'
            }
        },

        methods: {
            getCategorySkills(id) {
                this.menuStatus = id;
                this.showList = true;
            },
            goBack() {
                this.showList = false;
            },
            addToItems(id) {
                this.items.push(id);
            },
        },
        async mounted() {
            this.$nextTick(async () => {
                this.$nuxt.$loading.start()
                await this.$store.dispatch('socillMedia/getMyPosts')
                await this.$store.dispatch('socillMedia/getPosts')
                await this.$store.dispatch('socillMedia/getSavedPost')
                await this.$store.dispatch('socillMedia/getMyStories')
                await this.$store.dispatch('socillMedia/getFollowers')
                await this.$store.dispatch('socillMedia/getFollowing')
                this.$nuxt.$loading.finish()
            })
        },
      computed: {
            length() {
                return 7000
            },
        getStories(){
          return this.$store.getters['socillMedia/getStories']
        },
            getMyPost(){
                return this.$store.getters['socillMedia/getMyPosts']
                    .length >= 4 ? this.$store.getters['socillMedia/getMyPosts'] .slice(0 , 4) : this.$store.getters['socillMedia/getMyPosts']
            },
            getPosts(){
                return this.$store.getters['socillMedia/getPosts']
                    .length >= 4 ? this.$store.getters['socillMedia/getPosts'] .slice(0 , 4) : this.$store.getters['socillMedia/getPosts']

            },
            getSavedPost(){
                return this.$store.getters['socillMedia/getSavedPost']
                    .length >= 4 ? this.$store.getters['socillMedia/getSavedPost'] .slice(0 , 4) : this.$store.getters['socillMedia/getSavedPost']

            },
            getFollowers(){
                return this.$store.getters['socillMedia/getFollowers']
            },
            getFollowing(){
                return this.$store.getters['socillMedia/getFollowing']
            },
          getMyStories(){
                return this.$store.getters['socillMedia/getMyStories']
            },
        }
    }
</script>
