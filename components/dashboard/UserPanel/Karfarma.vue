<template>
<div class="container">
  <img src="/images/art5.png" class="my-5 mx-auto"/>
  <div class="p-2 bg-white rounded-lg shadow-lg">
    <div class="px-3">
      <div class="border-b-2 border-gray-300">
      <div class="w-20 pb-4 text-md text-black border-b-4 border-purple-600 ir-medium">پروژه ها</div>
    </div>
    <div class="px-5 py-2 flex flex-wrap justify-between">
      <div class="w-full border-b-2 border-dashed border-gray-400 pb-3 sm:border-none sm:pl-3 sm:w-1/2">
      <Inf2Purple :number="user.all_projects | toPersianNumber" :url="url" :btnName="btnName" :url2="url1" :btnName2="btnName1">
        <img slot="img-inf" src="/images/briefcase.png"/>
        <div slot="head-inf">پروژه های ایجاد شده</div>
        <div slot="name-inf">پروژه</div>
      </Inf2Purple>
      </div>
      <div class="w-full sm:w-1/2 sm:border-r-2 sm:border-dashed sm:border-gray-400 sm:pr-3">
      <Inf :number="user.own_doing_projects | toPersianNumber" :url="url3" :btnName="btnName3">
        <img slot="img-inf" src="/images/refresh-cw.png"/>
        <div slot="head-inf">پروژه در حال انجام</div>
        <div slot="name-inf">پروژه</div>
      </Inf>
      </div>
    </div>
  </div>
  </div>
  <div class="flex -mx-1 flex-wrap justify-between">
    <div class="lg:w-1/2 w-full px-1 flex-1">
      <SocialNetworksEmployer/>
    </div>
    <div class="px-1 flex-1">
      <FinancialDepartmentKarfarma/>
    </div>
  </div>
</div>
</template>
<script>
  import Inf2 from "../global/infKarfarma/Inf2";
  import Inf from "../global/infKarfarma/Inf";
    import SocialNetworks from "./SocialNetworks";
    import FinancialDepartmentKarfarma from "./FinancialDepartmentKarfarma";
  import Inf2Purple from "../global/infKarfarma/Inf2Purple";
  import SocialNetworksEmployer from "../employe/SocialNetworksEmployer";
  export default {
      name: "Karfarma",
      components: {SocialNetworksEmployer, Inf2Purple, Inf, Inf2,SocialNetworks,FinancialDepartmentKarfarma},
      data(){
          return{
              number:'۳۴۵',
              url:'/projects',
              btnName:'مشاهده پروژه ها',
              url1:'/createProject',
              btnName1:'ایجاد پروژه جدید',
              number3:'۳۴۵',
              url3:'/myProject',
              btnName3:'مشاهده پروژه های من',
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
          }
      }
  }
</script>
