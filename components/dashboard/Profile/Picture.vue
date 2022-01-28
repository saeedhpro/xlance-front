<template>
  <div class="container py-2 px-10 bg-white rounded-lg shadow-lg">
    <div class="pb-2 mb-2 flex border-b-2 border-gray-300">
      <div class="pb-3 text-sm text-gray-500 ir-medium" @click="status='1'" :class="{'select' : status==='1'}">تصاویر
        کاربری
      </div>
    </div>
    <div class="flex flex-col text-center items-center">
      <div class="my-3 text-gray-600 text-sm">فرمت‌های فایل مورد پذیرش برای تصویر (حداکثر حجم مورد پذیرش: ۱۰ مگابایت)
      </div>
      <div class="my-3 flex justify-center">
        <div class="px-2 py-1 bg-gray-200 rounded text-gray-600">PNG</div>
        <div class="px-2 py-1 mx-1 bg-gray-200 rounded text-gray-600">JPG</div>
        <div class="px-2 py-1 ml-1 bg-gray-200 rounded text-gray-600">JPEG</div>
        <div class="px-2 py-1 bg-gray-200 rounded text-gray-600">GIF</div>
      </div>
      <div class="mt-10">
        <img v-if="image" :src="image.path" class="w-56 h-56 my-10 rounded-full mx-auto" alt=""/>
        <div class="w-56 h-56 p-2  upload-box-title-box rounded-full bg-gray-100 text-center  relative" v-else>
          <div class="p-10 border-2 border-dashed border-gray-500 rounded-full">
            <div class="upload-box-title-text text-gray-700 ir-medium text-sm">
              تصویر حساب کاربری
            </div>
            <div class=" my-4 upload-box-title-text text-gray-700">
              ۱:۱
            </div>
            <div class="upload-box-title-input">
              <img src="/images/upload-icon.png" alt="">
              <button
                class="flex w-32 border-2 py-2 px-1 rounded-lg border-solid border-gray-500 text-gray-600 bg-gray-200 justify-center  text-sm"
                @click="toggleShow">
                <i class="fal fa-upload"></i>
                <div class=" mr-2">آپلود تصویر</div>
              </button>
              <input ref="upload" accept="image/jpeg,png" type="file" hidden @change="onFileDrop">
              <img src=""/>
            </div>
            <my-upload field="file"
                       @crop-success="cropSuccess"
                       @crop-upload-success="cropUploadSuccess"
                       @crop-upload-fail="cropUploadFail"
                       v-if="show"
                       :width="400"
                       :height="800"
                       url="https://api.xlance.ir/api/upload"
                       langExt
                       langType="en"
                       imgFormat="image/jpeg,png"
                       :params="params"
                       :headers="headers"
                       img-format="png"></my-upload>
            <img
              class="w-full  h-full upload-placeholder rounded-full absolute inset-0	"
              v-if="!image && (user.profile.avatar || user.profile.new_avatar)"
              :src="user.profile.avatar_accepted ? user.profile.avatar.path :
             user.profile.new_avatar ? user.profile.new_avatar.path :
             ''" alt=""/>
            <img
              v-else-if="image"
              ref="upload-placeholder"
              alt=""
              class="w-56 h-56 upload-placeholder rounded-full absolute inset-0	"
              :src="image.path"
              @click="onUploadClicked"
            >
          </div>

        </div>
      </div>
      <div class="mt-3 mb-10 w-64 py-2 border-solid border-2 rounded-lg border-gray-600 text-gray-600 align-center"
           v-if="user.profile.avatar && !user.profile.avatar_accepted">
        <span> <i class="fal fa-clock "></i></span>
        <span>در درست بررسی</span></div>
      <div
        class="my-3 w-64 py-2 border-solid border-2 rounded-lg border-greenFreelancer text-greenFreelancer align-center"
        v-else-if="user.profile.avatar && user.profile.avatar_accepted">
        <span> <i class="fal fa-check-circle mx-2"></i> </span>
        <span>تایید شده </span></div>
      <BackgroundPicture :user="user"/>
    </div>
  </div>
</template>

<script>
import Select from "../Select";
import BackgroundPicture from "../UserPanel/BackgroundPicture";
import myUpload from 'vue-image-crop-upload/upload-2';
import 'babel-polyfill';

export default {
  name: "Picture",
  components: {
    BackgroundPicture, Select,
    'my-upload': myUpload
  },
  props: {
    user: {
      required: true,
      type: Object,
    }
  },
  data() {
    return {
      base64: null,
      base641: null,
      showSessionModal: false,
      showSessionModal1: false,
      courseAdded: false,
      courseAdded1: false,
      avatar: null,
      background: null,
      status: '1',
      show: false,
      params: {
        token: '123456798',
        name: 'avatar'
      },
      headers: {
        "Authorization": `Bearer ${this.$cookies.get('token')}`
      },
      image: null
    }
  },
  methods: {
    onUploadClicked() {
      this.$refs.upload.click()
    },
    async onFileDrop(e) {
      const file = e.target.files[0];
      const base64 = await this.$toBase64(e.target.files[0])
      this.base64 = base64.data
      const data = new FormData()
      data.set('file_type', base64.type)
      data.set('base64_file', base64.base64)
      const dataForm = new FormData();
      dataForm.set('file', file);
      this.$store.dispatch('account/uploadImage', dataForm)
        .then((response) => {
          this.$store.dispatch('account/createPictureUser', {
            image_id: response.id
          })
            .then(res => {
              this.$emit('avatar_accepted', false)
            })
        })
        .catch((error) => {
        })
    },
    async onFile(e) {
      const file = e.target.files[0];
      const base64 = await this.$toBase64(e.target.files[0])
      this.base64 = base64.data
      const data = new FormData()
      data.set('file_type', base64.type)
      data.set('base64_file', base64.base64)
      const dataForm = new FormData();
      dataForm.set('file', file);
    },
    toggleShow() {
      this.show = !this.show;
    },
    cropSuccess(imgDataUrl, field) {
      // this.image = imgDataUrl;
    },
    cropUploadSuccess(jsonData, field) {
      // this.image = imgDataUrl;
      this.image = jsonData.data
      this.show = false
      this.$store.dispatch('account/createPictureUser', {
        image_id: this.image.id
      })
        .then(res => {
          this.$emit('avatar_accepted', false)
        })
    },
    cropUploadFail(status, field) {
    }
  },
}
</script>
