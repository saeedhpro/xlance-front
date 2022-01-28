<template>
  <div class="w-full p-4 mt-10 bg-white rounded-lg shadow-lg">
    <div class="pb-2 border-b-2 border-gray-300">
      <div class="w-20 pb-3 text-sm text-gray-500 ir-medium"  @click="status='1'" :class="{'select' : status==='1'}">نمونه کارها</div>
    </div>
    <div class="border-b-2 border-dashed border-gray-400 pb-3 ">
    <Inf2 :number="user.portfolios.length | toPersianNumber" :url="url" :btnName="btnName" :url2="url1" :btnName2="btnName1">
      <img slot="img-inf" src="/images/monitor.png"/>
      <div slot="head-inf">نمونه کارهای شما</div>
      <div slot="name-inf">نمونه کار</div>
    </Inf2>
    </div>
    <div class="mt-2 flex justify-between">
    <nuxt-link :to="`/portfolios/${i.id}`" v-for="(i , p) in listPortfolios" :key="p">
      <img v-if="i.images.length>0" :src="i.images[0].path" class="m-2 w-32 h-32 rounded-lg">
    </nuxt-link>
    </div>
</div>
</template>

<script>
    import Inf2 from "../global/Inf2";
    export default {
        name: "Portfolio",
        components: {Inf2},
        data(){
            return{
                number:'۳۵',
                url:'/portfolios',
                btnName:'مشاهده نمونه کارها',
                url1:'/portfolios',
                btnName1:'نمونه کار جدید',
                items:[],
                status:'1'
            }
        },
        computed:{
            user(){
                return this.$store.getters['user/user']
            },
            listPortfolios(){
                return this.$store.getters['account/getUserPortfolios']
            }
        }
    }
</script>
