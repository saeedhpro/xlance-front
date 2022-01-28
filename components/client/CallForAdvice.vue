<template>
  <div class="my-20 bg-white rounded-lg ">
  <div class="bg-support">
  <div class="py-6 px-2 rounded-lg w-full items-center  shadow-lg flex flex-wrap justify-around">
    <div>
      <div class="mt-2 mb-2 ka-font text-4xl text-black text-right ">مشاوره رایگان</div>
      <div class="mb-2 text-sm text-gray-700 text-right ">دریافت رایگان مشاوره جهت انجام هرچه بهتر پروژه‌های شما</div>
    </div>
    <div class="mt-6 mb-2">
    <div class="flex">
      <div class="flex items-center">
        <div class="ml-4 text-black ir-medium">۰۲۱-۶۶۸۸۲۲۱۱</div>
        <div class="w-10 h-10 p-2 border-2 border-dashed border-purple-600 rounded-lg">
          <i class="fal fa-phone-plus text-purple-600"></i>
        </div>
      </div>
      <a href="/" class="p-2 text-md sm:mr-10 mr-4 bg-purple-600 text-white rounded-lg shadow-lg text-center">درخواست مشاوره</a>
    </div>
    </div>
  </div>
  </div>
  </div>
</template>

<script>
    export default {
        name: "CallForAdvice"
    }
</script>
<style scoped>
  .bg-support{
    background: url("../../static/images/ContactBg.png") 0 0 no-repeat;
    background-size: cover;
  }
</style>
