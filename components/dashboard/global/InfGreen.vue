<template>
  <div class="my-5 flex justify-between">
    <div class="flex">
      <div class="w-10 h-10 p-2 rounded-lg bg-gray-300">
        <slot name="img-inf">
        <img src="/images/briefcase.png"/>
        </slot>
      </div>
      <div>
      <div class="mr-2 mt-2 text-sm text-gray-700">
        <slot name="head-inf">پروژه با مهارت های شما</slot>
      </div>
<!--        <div class="mr-2 text-sm text-gray-600" v-if="head2-inf">-->
<!--        <slot name="head2-inf">(شما ۳۰۰ نفر را دنبال می‌کنید)</slot>-->
<!--        </div>-->
      </div>
    </div>
    <div class="flex-col">
      <div class="flex px-1 py-1 border-dashed border-2 border-greenFreelancer rounded-lg text-center float-left" style="align-items: center;">
        <span v-text="number" class="ml-2 ir-bold text-greenFreelancer" style="font-size: 23px">۴۵۶۷</span>
        <span class="ir-light text-greenFreelancer text-sm"><slot name="name-inf">پروژه</slot></span>
      </div>
      <div class="mt-12" style="    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;">
        <nuxt-link :to="url" v-text="btnName" class="sm:p-2 p-1 btn-size my-1  bg-gray-300 rounded-lg text-gray-700 sm:text-base text-sm hover:bg-greenKam hover:text-greentype" >مشاهده پروژه ها</nuxt-link>
      </div>
    </div>
  </div>

</template>

<script>
    export default {
        name: "InfGreen",
        props:['number','url','btnName','url2','btnName2']
    }
</script>

<style scoped>
.btn-size{
  width: max-content;
}
</style>
