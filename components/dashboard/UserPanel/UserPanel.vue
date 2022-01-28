<template>
<div class="container">
  <img src="/images/Path146.png" class="my-5 mx-auto"/>
  <div>
  <div class="p-4 w-full bg-white rounded-lg shadow-lg">
    <div class="border-b-2 border-gray-300">
      <div class="w-40 pb-4 text-md text-black border-b-4 border-greenFreelancer ir-bold">پروژه ها و پیشنهادات</div>
    </div>
    <div class="px-5 py-2 flex flex-wrap justify-between">
      <div class="w-full sm:w-1/2 sm:border-l-2 sm:border-dashed sm:border-gray-400 md:pl-3 ">
        <div class="border-b-2 border-dashed border-gray-400 pb-3">
          <InfGreen :number="getProject  | toPersianNumber" :url="url" :btnName="btnName">
          <img slot="img-inf" src="/images/briefcase.png"/>
          <div slot="head-inf">پروژه ها با مهارت های شما</div>
          <div slot="name-inf">پروژه</div>
        </InfGreen>

        </div>
        <div class="border-b-2 border-dashed border-gray-400 pb-3 sm:border-none">
        <Inf :number="user.number - user.requests_count  | toPersianNumber" :url="url1" :btnName="btnName1">
          <img slot="img-inf" src="/images/file-text.png"/>
          <div slot="head-inf">پیشنهاد باقی مانده</div>
          <div slot="name-inf">پیشنهاد</div>
        </Inf>
        </div>
      </div>
      <div class="w-full sm:w-1/2 sm:pr-3">
        <div class="border-b-2 border-dashed border-gray-400 pb-3 ">
        <Inf :number="user.doing_projects  | toPersianNumber" :url="url2" :btnName="btnName2">
          <img slot="img-inf" src="/images/refresh-cw.png"/>
          <div slot="head-inf">پروژه در حال انجام</div>
          <div slot="name-inf">پروژه</div>
        </Inf>
        </div>
        <div>
        <Inf :number="user.finished_projects  | toPersianNumber" :url="url3" :btnName="btnName3">
          <img slot="img-inf" class="pt-1" src="/images/check.png"/>
          <div slot="head-inf">پروژه انجام شده</div>
          <div slot="name-inf">پروژه</div>
        </Inf>
        </div>
      </div>
    </div>
  </div>
  </div>
  <div class="flex -mx-1 flex-wrap justify-between">
    <div class="lg:w-1/2 w-full px-1 flex-1">
  <SocialNetworks/>
    </div>
    <div class="px-1 flex-1">
      <FinancialDepartment/>
      <Portfolio/>
    </div>
  </div>
</div>
</template>

<script>
    import SocialNetworks from "./SocialNetworks";
    import FinancialDepartment from "./FinancialDepartment";
    import Portfolio from "./Portfolio";
    import Inf from "../global/Inf";
    import Inf2 from "../global/Inf2";
    import InfGreen from "../global/InfGreen";
    export default {
        name: "UserPanel",
        components: {InfGreen, Portfolio, SocialNetworks,FinancialDepartment,Inf,Inf2},
        data(){
            return{
                url:'/projects',
                btnName:'مشاهده پروژه ها',
                url1:'/membership-upgrade',
                btnName1:'ارتقا عضویت',
                url2:'/myProject',
                btnName2:'مشاهده پروژه های من',
                url3:'/myProject',
                btnName3:'پروژه های من',
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.$nuxt.$loading.start()
                setTimeout(() => this.$nuxt.$loading.finish(), 500)
            })
        },
        computed:{
            user(){
                return this.$store.getters['user/user']
            },
            getProject(){
                return this.$store.getters['skills/projectsCount'];
            }
        },
    }
</script>
