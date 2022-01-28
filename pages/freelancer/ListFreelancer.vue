<template>
<div v-if="laravelData && laravelData.data">
  <div class="flex align-center items-center my-20 justify-start relative"  v-for="(item, index) in laravelData.data.slice(0, number)" :key="index">
    <div class="contents  align-center items-center">
    <div  class=" p-2 pr-3 pt-0 bg-white rounded rounded-tl-lg shadow-md" style="border-top-left-radius: 160px;height: 245px;width: 245px">
      <div class="relative">
        <img src="/images/markpurple.png" class="h-12 w-10 top-0 mb-2"/>
        <div class="-mt-12 px-1 absolute text-2xl text-white">
          <div v-if="loggedInUser" style="margin-top: -3px;padding-right: 2px;">
            <i class="fal fa-star"></i>
          </div>
          <div v-else style="padding-right: 9px;margin-top: -6px;">
            {{index+1 | toPersianNumber}}
          </div>
        </div>
      </div>
      <div  class="flex justify-between">
        <nuxt-link :to="`/profiles/${item.id}`" class="ir-bold">
          {{item.username}}
          <div class="mt-2 -mr-18">
            <rating-component :value="item.rate" :maxStars="5" :hasCounter="true" class="rate_size hover:none" :dis="true"/>
        </div>
          <div v-if="item.profile.avatar" class="bg-greenFreelancer rounded-full absolute " style="
    margin-right: 130px;
    margin-top: -111px;width: 6.8rem;
    height: 6.8rem;">
            <img  :src="item.profile.avatar.path" class="rounded-full" style="width: 6.8rem;
    height: 6.8rem;"/>
          </div>
        <div v-else class="p-5 bg-greenFreelancer rounded-full absolute" style="
    margin-right: 130px;
    margin-top: -111px;">
          <img src="/images/logo-white.png" class="w-16 h-16"/>
        </div>
      </nuxt-link>
      </div>
      <div class="mt-3 mb-3 flex justify-between">
        <div class="px-10 border-l-2 border-gray-500">
          <h2 class="text-greenFreelancer ir-bold text-2xl">{{item.finished_projects  | toPersianNumber}}</h2>
          <span class="text-dark text-sm">پروژه</span>
        </div>
        <div  v-if="item && loggedInUser && (item.id !== loggedInUser.id)" class="mx-5">
          <div v-if="!item.followed" @click="followUser(item.id)" class="p-1 flex-none border-gray-500 text-gray-500 text-sm bg-gray-100 border-solid border-2 rounded-lg text-center click">
            <div><i class="fal fa-user-plus"></i></div>
            <div>دنبال کن</div>
          </div>

          <div v-else @click="unFollowUser(item.id)" class="click" >
            <img src="../../static/images/follow.svg" style="width: 60px"/>
          </div>

        </div>
        <div v-else  class="px-1 flex flex-col">
            <h2 class="flex text-greenFreelancer mx-auto ir-bold text-xl">
              {{Math.ceil(item.withdraws_amount /10000000).toLocaleString() | toPersianNumber }}
              <span class="mr-1 flex-col" style="font-size: 13px">
                <div class="ir-bold">میلیون</div>
                <div class="ir-bold">تومان</div>
              </span>
            </h2>
            <span class="mx-auto text-dark text-sm">درآمد ماه</span>
        </div>
      </div>
      <div class="flex justify-start" style="overflow-x: hidden">
      <div  v-for="(skill , index) in  item.skills">
        <div class="p-1 ml-1  bg-purple-200 rounded text-purple-600" style="width: max-content;" >{{skill.name}}</div>
      </div>
      </div>
    </div>
    <img src="/images/art3.png" class="hidden md:flex mx-10 h-8"/>
    </div>
    <nuxt-link  :to="`/portfolios/${portfolio.id}`" class="mx-1 hidden md:flex" v-for="(portfolio , index) in item.portfolios.slice(0, 3)" :key="index">
      <img alt="portfolio" style="height: 245px;width: 245px" class="rounded-lg" v-if="portfolio.images.length>0" :src="portfolio.images[0].path" />
    </nuxt-link>
<!--    <nuxt-link v-else to="/auth/Log-in" class="mx-1 hidden md:flex" v-for="(portfolio , index) in item.portfolios" :key="index">-->
<!--      <img alt="portfolio" style="height: 245px;width: 245px" class="rounded-lg" v-if="portfolio.images.length>0" :src="portfolio.images[0].path" />-->
<!--    </nuxt-link>-->
  </div>
  <pagination v-if="hasPaginate" :data="laravelData" @pagination-change-page="getResults"></pagination>
</div>
</template>
<script>
  import RatingComponent from "../../components/RatingComponent";
    export default {
        name: "ListFreelancer",
      // middleware:'auth',
      // head(){
      //   return {
      //     title: 'لیست فریلنسرها'
      //   }
      // },
   components:{RatingComponent},
        props: {
            number:{
                type:Number,
                default: 10,
            },
            laravelData:{
                type:Object
            },
            hasPaginate: {
                type: Boolean,
                default: false,
            }
        },
        computed: {
          loggedInUser(){
            return this.$store.getters['user/user']
          },
        },
        methods:{
          followUser(id) {
            this.$store.dispatch('freelancer/setFollowed', true)
            this.$store.dispatch('user/followUser', {'': id})
          },
          unFollowUser(id) {
            this.$store.dispatch('freelancer/setFollowed', false)
            this.$store.dispatch('user/unFollowUser', {'': id})
          },
            getResults(page = 1) {
                this.$emit('paginate' , page)
            },
            round(num) {
                num = parseFloat(num)
                return Math.round((num + Number.EPSILON) * 100) / 100;
            }
        },
    }
</script>
