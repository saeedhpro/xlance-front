<template>
  <div class="container">
<div class=" px-5 py-4 mb-10 justify-star bg-white shadow-lg rounded-lg flex hidden sm:block">
  <nuxt-link to="/account" class="text-gray-900 text-sm ir-medium" >حساب کاربری</nuxt-link>
  <nuxt-link to="/picture" class="text-gray-900 text-sm mx-5 ir-medium" >تصاویر کاربری</nuxt-link>
  <nuxt-link to="/skills" class="text-gray-900 text-sm mx-5 ir-medium">مهارت ها</nuxt-link>
  <nuxt-link to="/portfolios" class="text-gray-900 text-sm mx-5 ir-medium" >نمونه کارها</nuxt-link>
  <nuxt-link to="/cv" class="text-gray-900 text-sm mx-5 ir-medium" >رزومه</nuxt-link>
  <nuxt-link to="/password" class="text-gray-900 text-sm mx-5 ir-medium" >رمز عبور</nuxt-link>
  <nuxt-link to="/account-setting" class="text-gray-900 text-sm mx-5 ir-medium" >شماره شبا</nuxt-link>

  <nuxt-link :to=" user.validated ? `/profiles/${user.id}`  : `/employer/${user.id}` "  class="mr-auto float-left	text-greentype text-sm underline">مشاهده صفحه شما</nuxt-link>
</div>
</div>
</template>

<script>
  import Account from "./AccountProfile";
  import Skills from "./Skills";
  import Portfolios from "./Portfolios";
  import Cv from "./Cv";
  import Picture from "./Picture";
  import Password from "./Password";

    export default {
        name: "TabProfile",
        data(){
            return{
                SelectedComponent:'app-component-1',
            }
        },
        components:{
            "app-component-1":Account,
            "app-component-2":Skills,
            "app-component-3":Portfolios,
            "app-component-4":Cv,
            "app-component-5":Picture,
            "app-component-6":Password,
        },
        computed:{
            user(){
                return this.$store.getters['user/user']
            }
        }
    }
</script>

<style scoped>
  .nuxt-link-active{
    color: #673AB7;
    background-color: #F2EBFF;
    border-radius: 5px;
    padding-right: 10px;
    padding-left: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
  }
</style>
