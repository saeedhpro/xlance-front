<!--<template>-->
<!--  <div>-->
<!--    <a @click="toggleShow" class="btn flex m-auto w-32 border-2 py-2 px-1 rounded-lg border-solid border-gray-500 text-gray-600 bg-gray-200 justify-center  text-sm">-->
<!--      <i class="fal fa-upload"></i>-->
<!--      <div class=" mr-2">آپلود </div>-->
<!--    </a>-->
<!--&lt;!&ndash;    <a class="btn" @click="toggleShow">آپلود تصویر</a>&ndash;&gt;-->
<!--    <my-upload field="img"-->
<!--               @crop-success="cropSuccess"-->
<!--               @crop-upload-success="cropUploadSuccess"-->
<!--               @crop-upload-fail="cropUploadFail"-->
<!--               v-model="show"-->
<!--               :width="300"-->
<!--               :height="300"-->
<!--               url="/upload"-->
<!--               :params="params"-->
<!--               :headers="headers"-->
<!--               img-format="png"></my-upload>-->
<!--    <img :src="imgDataUrl"/>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--  export default {-->
<!--  name: "imageUpload",-->
<!--  data() {-->
<!--    return {-->
<!--      show: true,-->
<!--      params: {-->
<!--        token: '123456798',-->
<!--        name: 'avatar'-->
<!--      },-->
<!--      headers: {-->
<!--        smail: ''-->
<!--      },-->
<!--      imgDataUrl: ''-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    toggleShow() {-->
<!--      this.show = !this.show;-->
<!--    },-->
<!--    cropSuccess(imgDataUrl, field){-->
<!--      this.imgDataUrl = imgDataUrl;-->
<!--    },-->
<!--    cropUploadSuccess(jsonData, field){-->
<!--    },-->
<!--    cropUploadFail(status, field){-->
<!--    }-->
<!--  }-->
<!--};-->
<!--</script>-->
