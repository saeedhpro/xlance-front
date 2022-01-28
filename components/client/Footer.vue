<template>
  <div class="bg w-full text-center pt-20 pb-10">
    <div class="container">
<div class="flex  flex-wrap ">
<div class="lg:w-1/4 w-full">
  <img src="/images/logo-white.png" class="w-16 h-16"/>
  <h3 class="mt-2 text-gray-100 text-right ka-font text-4xl">ایکس لنس</h3>
  <div class="mt-5 w-14  text-gray-100 ir-light text-sm text-right">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است</div>
</div>
<div class="lg:w-1/4 mt-3 lg:mt-0 w-full flex-none">
  <h3 class="py-2 text-gray-100 ir-bold text-md">ایکس لنس</h3>
  <div class="mt-5 my-3">
  <nuxt-link to="/About-us" class=" text-white text-sm text-gray-100">درباره ما</nuxt-link>
  </div>
  <div class="my-3">
  <nuxt-link to="/Contact-us" class="text-white text-sm text-gray-100">تماس با ما</nuxt-link>
  </div>
  <div class="my-3">
  <nuxt-link to="/" class="text-white text-sm text-gray-100">چطور پروژه ایجاد کنیم؟</nuxt-link>
  </div>
  <div class="my-3">
  <nuxt-link to="/Rules" class="text-white text-sm text-gray-100">قوانین و مقررات</nuxt-link>
  </div>
</div>
  <div class="lg:w-1/4 mt-3 lg:mt-0 w-full flex-none">
  <h3 class="py-2 text-gray-100 ir-bold text-md">خدمات ما</h3>
    <div class="mt-3 my-3">
      <nuxt-link to="/projects" class="text-white text-sm text-gray-100">پروژه ها</nuxt-link>
    </div>
    <div class="mt-3 my-3">
      <nuxt-link to="/Blog" class="text-white text-sm text-gray-100">مقاله ها</nuxt-link>
    </div>
    <div class="my-3">
  <nuxt-link to="/" class="text-white text-sm text-gray-100 ">مسابقه ها</nuxt-link>
    </div>
    <div class="my-3">
  <nuxt-link to="/" class="text-white text-sm text-gray-100">سوالات متداول</nuxt-link>
    </div>
</div>
<div class="lg:w-1/4 w-full">
  <h3 class="py-2 text-gray-100 ir-bold text-md">مارا دنبال کنید</h3>
  <div class="mt-5 flex justify-evenly">
    <img src="/images/instagram.png"/>
    <img src="/images/telegram.png"/>
    <img src="/images/facebook_circled.png"/>
    <img src="/images/twitter.png"/>
    <img src="/images/whatsapp.png"/>
  </div>
  <div class="flex flex-wrap mt-2">
    <img src="/images/Group92.png" class="w-32"/>
    <img src="/images/Group93.png"  class="w-32"/>
  </div>

</div>
</div>
    </div>
    <div class="text-gray-100 text-sm">تمامی حقوق متعلق به ایکس‌لنس می‌باشد | ۱۳۹۹</div>
  </div>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped>
.bg{
  background: url("../../static/images/footer-backg2.png") 0 0 no-repeat;
  background-size: cover;
}
  @media (max-width: 1000px) {
    .bg {
      height: auto;
      padding-top: 3px !important;
      background: url("../../static/images/foo.png") 0 0 no-repeat;
      background-size: cover;
    }
  }
</style>
