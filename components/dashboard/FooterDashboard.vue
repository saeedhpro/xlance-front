<template>
  <div class="footer relative mt-20">
<div class="pt-10  container footerMedia flex flex-wrap " style="justify-content: space-around">
<!--  <div>-->
<!--    <div class="mt-5 flex justify-evenly">-->
<!--      <img src="/images/instagram.png"/>-->
<!--      <img src="/images/telegram.png"/>-->
<!--      <img src="/images/facebook_circled.png"/>-->
<!--      <img src="/images/twitter.png"/>-->
<!--      <img src="/images/whatsapp.png"/>-->
<!--    </div>-->
<!--  </div>-->
  <div class="lg:w-3/6 w-full">
  <div class=" py-2 px-5 flex flex-wrap justify-between bg-white rounded-lg shadow-md">
    <nuxt-link to="projects" class="text-gray-600 sm:m-0 sm:m-2 m-1">پروژه ها</nuxt-link>
    <nuxt-link to="/Freelancer" class="text-gray-600 sm:m-0 sm:m-2 m-1">فریلنسرها</nuxt-link>
    <nuxt-link to="/About-us" class="text-gray-600 sm:m-0 sm:m-2 m-1">درباره ما</nuxt-link>
    <nuxt-link to="/Contact-us" class="text-gray-600 sm:m-0 sm:m-2 m-1">تماس با ما</nuxt-link>
    <nuxt-link to="/blog" class="text-gray-600 sm:m-0 sm:m-2 m-1">مقاله ها</nuxt-link>
    <nuxt-link to="/" class="text-gray-600 sm:m-0 sm:m-2 m-1">چطور پروژه ایجاد کنم؟</nuxt-link>
  </div>
    <div class="text-gray-600 text-left mt-20 text-sm">تمامی حقوق متعلق به ایکس‌لنس می‌باشد | ۱۳۹۹</div>
  </div>
</div>
    <div class="mt-2 flex icon-footer justify-evenly absolute" style="margin-right: 17%">
      <img src="/images/instagram.png" class="w-4 h-4 mx-1 mr-2"/>
      <img src="/images/telegram.png" class="w-4 h-4 mx-1"/>
      <img src="/images/facebook_circled.png" class="w-4 h-4 mx-1"/>
      <img src="/images/twitter.png" class="w-4 h-4 mx-1"/>
      <img src="/images/whatsapp.png" class="w-4 h-4 mx-1"/>
    </div>
  </div>
</template>
<script>
    export default {
        name: "FooterDashboard"
    }
</script>
<style scoped>
@media (min-width: 1261px) {
  .footer{
    height: 213px;
    background: url("../../static/images/Footer-backg.png");
    background-size: cover;
  }
}
  @media (max-width: 1260px) {
    .footerMedia{
      justify-content: center;
      height: auto;
      background: url("../../static/images/foo.png") 0 0 no-repeat;
    }
    .icon-footer{
      display: none;
    }
  }
</style>
