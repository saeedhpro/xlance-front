<template>
  <button class="my-3 w-56 h-12 items-center py-2 inline-block bg-purple-600 bg-purple-600  rounded-lg"
          style="box-shadow: #673AB766 0px 8px 32px">
    <img src="/images/Rolling-1s-200px.svg" v-if="loadingbtn" class="mx-auto w-5 h-5"/>
    <span v-text="text" class="text-white" v-if="loadingText">ثبت نام</span>
    <!--    <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24" v-if="loadingbtn">-->
    <!--    </svg>-->
  </button>
</template>

<script>
export default {
  name: "PurpleButtonGlobal",
  props: {
    text: {
      Type: String,
      default: '',
    },
    loadingText: {
      Type: Boolean,
      default: false,
    },
    loadingbtn: {
      Type: Boolean,
      default: false,
    }
  }
}
</script>
