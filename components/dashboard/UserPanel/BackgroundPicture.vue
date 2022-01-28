<template>
  <div style=" width: 100%;">
    <div class="w-full items-center text-center">
      <div class="p-2  upload-box-title-box rounded-lg bg-gray-100 text-center  relative">
        <img v-if="image" :src="image.path" class="mx-auto"/>
        <div class="p-10 text-center border-2 border-dashed border-gray-500 rounded-lg" v-else>
          <div class="upload-box-title-text text-gray-700 ir-medium text-sm">
            تصویر جلد
          </div>
          <div class=" my-4 upload-box-title-text text-gray-700">
            ۱۱۲۰ ۲۴۰x
          </div>
          <div class="upload-box-title-input">
            <img src="/images/upload-icon.png">
            <button
              class="flex m-auto w-32 border-2 py-2 px-1 rounded-lg border-solid border-gray-500 text-gray-600 bg-gray-200 justify-center  text-sm"
              @click="toggleShow">
              <i class="fal fa-upload"></i>
              <div class=" mr-2">آپلود تصویر</div>
            </button>
            <input ref="upload" accept="image/jpeg,png" type="file" hidden @change="onFileDrop">
          </div>
          <my-upload field="file"
                     @crop-success="cropSuccess"
                     @crop-upload-success="cropUploadSuccess"
                     @crop-upload-fail="cropUploadFail"
                     v-if="show"
                     :width="1120"
                     :height="240"
                     url="https://api.xlance.ir/api/upload"
                     noRotate="false"
                     noSquare="false"
                     noCircle="false"
                     langExt
                     langType="en"
                     imgFormat="image/jpeg,png"
                     :params="params"
                     :headers="headers"
                     img-format="png"></my-upload>
          <img
            class="w-full  h-full upload-placeholder rounded-lg absolute inset-0	"
            v-if="!image && (user.profile.bg || user.profile.new_bg)"
            :src="user.profile.bg_accepted ? user.profile.bg.path :
             user.profile.new_bg ? user.profile.new_bg.path :
             ''"/>
          <img
            v-if="image"
            ref="upload-placeholder1"
            alt=""
            class="w-full  h-full upload-placeholder rounded-lg absolute inset-0	"
            :src="image.path"
            @click="onUploadClicked"
          >
        </div>
      </div>
      <div
        class="my-3 w-64 py-2 border-solid border-2 rounded-lg border-gray-600 text-gray-600 align-center mx-auto mt-10"
        v-if="user.profile.bg && !user.profile.bg_accepted">
        <span> <i class="fal fa-clock "></i></span>
        <span>در درست بررسی</span></div>
      <div
        class="my-3 w-64 py-2 border-solid border-2 rounded-lg border-greenFreelancer text-greenFreelancer align-center mx-auto mt-10"
        v-else-if="user.profile.bg && user.profile.bg_accepted">
        <span> <i class="fal fa-check-circle mx-2"></i> </span>
        <span>تایید شده </span></div>
    </div>

  </div>

</template>

<script>
import myUpload from 'vue-image-crop-upload/upload-2';
import 'babel-polyfill';
import Select from '~/components/dashboard/Select'

export default {
  name: "BackgroundPicture",
  props: {
    user: {
      required: true,
      type: Object,
    }
  },
  components: {
    Select,
    'my-upload': myUpload
  },
  data() {
    return {
      base64: null,
      showSessionModal: false,
      courseAdded: false,
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
      let file = e.target.files[0];
      if (!this.isTrueDimensions(file)) {
        this.$snotify.error('ابعاد عکس صحیح نیست!');
        return;
      }
      const base64 = await this.$toBase64(e.target.files[0])
      this.base64 = base64.data
      const data = new FormData()
      data.set('file_type', base64.type)
      data.set('base64_file', base64.base64)
      const dataForm = new FormData();
      dataForm.set('file', file);
      this.$store.dispatch('account/uploadImage', dataForm)
        .then((response) => {
          this.national = response.id
          this.$store.dispatch('account/createBackgroundPicture', {
            image_id: response.id
          })
        })
        .catch((error) => {
        })
    },
    async onFile(e) {
      let file = e.target.files[0];
      if (!this.isTrueDimensions(file)) {
        this.$snotify.error('ابعاد عکس صحیح نیست!');
        return;
      }
      const base64 = await this.$toBase64(e.target.files[0])
      this.base64 = base64.data
      const data = new FormData()
      data.set('file_type', base64.type)
      data.set('base64_file', base64.base64)
      const dataForm = new FormData();
      dataForm.set('file', file);

    },
    isTrueDimensions(file) {
      let reader = new FileReader();
      let img = new Image();
      try {
        reader.readAsDataURL(file);
        reader.onload = evt => {
          img.src = evt.target.result;
        }
        if (img.height / img.width !== 1) {
          return false;
        } else if (img.height === 240) {
          return false;
        } else if (img.width === 1120) {
          return false;
        }
        return true;
      } catch (e) {
        return false;
      }
    },
    toggleShow() {
      this.show = true;
    },
    cropSuccess(imgDataUrl, field) {
      // this.image = imgDataUrl;
    },
    cropUploadSuccess(jsonData, field) {
      this.image = jsonData.data
      this.$store.dispatch('account/createBackgroundPicture', {
        image_id: this.image.id,
      })
      this.show = false
    },
    cropUploadFail(status, field) {
    }
  },
}
</script>
