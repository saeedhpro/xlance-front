<template>
    <div class="w-full items-center h-full bg flex flex-col justify-center">
      <div class="px-8 py-10 bg-white rounded-lg shadow-lg text-center style-log ">
      <nuxt/>
      </div>
      <div class="mt-3 text-sm text-white">تمامی حقوق متعلق به ایکس‌لنس می‌باشد | ۱۳۹۹</div>
    </div>
</template>
<script>
    export default {
        name: "register",
        middleware:'guest',
    }
</script>
<style scoped>
.bg{
  background: url("../static/images/backg.png") 0 0 no-repeat;
  background-size: cover;
}
  .style-log{
    width: 430px
  }
  @media (max-width: 500px) {
    .style-log{
      width: 100%
    }
  }
</style>
