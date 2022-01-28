
<template>
  <div class="container">
    <div class="flex  items-center">
      <div class="lg:w-1/2 md:w-full sm:w-full text-center">
        <img src="/images/art1.png" class="-mt-5 mr-20 absolute"  />
        <h1 class="text-purple-600 text-5xl font-black ka-font">ایکس لنس</h1>
        <p class="mt-5 text-purple-600 ir-medium" >محلی حرفه ای برای انجام پروژه های شما</p>
        <div class="mt-5 mx-auto text-gray-500 ir-medium" style="max-width: 503px">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز
        </div>
        <div class="w-full mt-10 p-8 flex bg-white justify-between rounded-lg shadow-lg toph">
          <nuxt-link to="/auth/register" class="md:w-40 py-3 w-full p-2 m-1 bg-purple-600 text-white rounded-lg" style="box-shadow: #673AB766 0px 8px 32px">پروژه دارم</nuxt-link>
          <span class="my-auto text-gray-500 ir-medium hi">- - - - - - - - - - - - - - -</span>
          <nuxt-link to="/auth/register" class="md:w-40 py-3 w-full p-2 m-1  bg-greenFreelancer text-white rounded-lg" style="box-shadow: #00C37966 0px 8px 32px">فریلنسر هستم</nuxt-link>
        </div>
      </div>
      <div class="sm:w-1/2 hidden md:block sm:block justify-end mr-auto">
        <img src="/images/illustration.png" class="w-1/2 m-auto " style="margin: inherit;margin-right: 208px"/>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        name: "TopHome"
    }
</script>
<style>
 @media (max-width: 1270px) {
   .hi{
     visibility: hidden;
   }
 }

 @media (max-width: 770px) {
   .toph{
     flex-wrap: wrap;
   }
 }
</style>
