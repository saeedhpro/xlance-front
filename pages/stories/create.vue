<template>
  <div class="container bg-white rounded-lg shadow-lg">
    <div class="px-3">
      <div class="pb-2 mb-2 border-b-2 border-gray-300 flex justify-between items-center">
        <div class="pb-3 text-sm text-gray-500 ir-medium" @click="status='1'" :class="{'select' : status==='1'}">استوری
          جدید
        </div>
        <nuxt-link to="/socialMedia" class="text-greenFreelancer underline">برگشت</nuxt-link>
      </div>
      <div class="my-10 mx-auto text-center text-gray-600" style="max-width: 700px">از طریق این بخش می‌توانید یک تصویر
        را به مدت ۲۴ ساعت به عنوان یک «استوری» در پروفایل خود قرار دهید دیگر کاربران می‌توانند استوری شما را در این مدت
        مشاهده کنند
      </div>

      <div class="flex justify-center">
        <div class="sm:w-1/3 h-90 items-center text-center">
          <div class="p-2  upload-box-title-box rounded-lg bg-gray-100 text-center  relative">
            <div class=" text-center border-2 border-dashed border-gray-500 rounded-lg">
              <img v-if="image" :src="image.path" class="mx-auto rounded-lg"/>
              <div class="p-10" v-else>
                <div class="upload-box-title-text text-gray-700 ir-medium text-sm">
                  تصویر استوری شما
                </div>
                <div class="my-20">
                  <img src="/images/storiSize.png"/>
                </div>
                <div class="my-3 text-gray-600 text-sm">فرمت‌های فایل مورد پذیرش برای تصویر (حداکثر حجم مورد پذیرش: ۱۰
                  مگابایت)
                </div>
                <div class="my-3 flex justify-center">
                  <div class="px-2 py-1 bg-gray-200 rounded text-gray-600">PNG</div>
                  <div class="px-2 py-1 mx-1 bg-gray-200 rounded text-gray-600">JPG</div>
                  <div class="px-2 py-1 ml-1 bg-gray-200 rounded text-gray-600">JPEG</div>
                  <div class="px-2 py-1 bg-gray-200 rounded text-gray-600">GIF</div>
                </div>
                <div class="my-5 upload-box-title-input">
                  <img src="/images/upload-icon.png"/>
                  <button @click="toggleShow"
                          class="btn flex m-auto w-32 border-2 py-2 px-1 rounded-lg border-solid border-gray-500 text-gray-600 bg-gray-200 justify-center  text-sm">
                    <i class="fal fa-upload"></i>
                    <div class=" mr-2">آپلود تصویر</div>
                  </button>
                  <div>
                    <!--          <a @click="toggleShow" class="btn flex m-auto w-32 border-2 py-2 px-1 rounded-lg border-solid border-gray-500 text-gray-600 bg-gray-200 justify-center  text-sm">-->
                    <!--            <i class="fal fa-upload"></i>-->
                    <!--            <div class=" mr-2">آپلود </div>-->
                    <!--          </a>-->
                    <!--    <a class="btn" @click="toggleShow">آپلود تصویر</a>-->
                    <my-upload field="file"
                               v-if="show"
                               @crop-success="cropSuccess"
                               @crop-upload-success="cropUploadSuccess"
                               @crop-upload-fail="cropUploadFail"
                               :width="400"
                               :height="800"
                               url="https://api.xlance.ir/api/upload"
                               noRotate="false"
                               noCircle="false"
                               langExt="en"
                               langType="en"
                               imgFormat="image/jpeg,png"
                               :params="params"
                               :headers="headers"
                               img-format="png"></my-upload>


                  </div>
                  <!--              <input ref="upload" accept="image/jpeg,png" type="file" hidden @change="onFile">-->
                  <img :src="image"/>
                </div>
                <!--            <img-->
                <!--              v-if="base64"-->
                <!--              ref="upload-placeholder"-->
                <!--              alt=""-->
                <!--              class="w-full  h-full upload-placeholder rounded-lg absolute inset-0	"-->
                <!--              :src="base64"-->
                <!--              @click="onUploadClicked"-->
                <!--            >-->
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="mt-10 flex items-center align-center justify-center">
        <v-checkbox
          v-model="ex4"
          color="greenFreelancer"
          value="success"
        ></v-checkbox>
        <div class="-mt-4 mr-2 text-gray-700 text-sm"><span class="text-greenFreelancer text-sm ">قوانین و مقررات قرار دادن استوری</span>
          در ایکس لنس را خوانده ام و با آنها موافقم
        </div>
      </div>
      <div class="my-10 text-center text-white">
        <button type="button" class="w-64 h-10 p-1 ir-medium  rounded-lg bg-greentype btnSave" :disabled="!ex4"
                @click="saveStory">
          <img src="/images/Rolling-1s-200px.svg" v-if="loadingbtn" class="mx-auto w-5 h-5"/>
          <span v-if="loadingText">قرار دادن استوری</span></button>
      </div>

    </div>

    <client-only>
      <vue-snotify></vue-snotify>
    </client-only>
  </div>
</template>
<script>
import Select from "../../components/dashboard/Select";
// import myUpload from 'vue-image-crop-upload/upload-2';
import myUpload from 'vue-image-crop-upload/upload-2';
import 'babel-polyfill';

export default {
  name: "Create",
  layout: 'dashboard',
  components: {
    Select,
    'my-upload': myUpload
  },
  middleware: 'auth',
  head() {
    return {
      title: 'ایجاد استوری'
    }
  },
  data() {
    return {
      base64: null,
      showSessionModal: false,
      courseAdded: false,
      ex4: false,
      status: '1',
      image: null,
      imgDataUrl: '',
      loadingbtn: false,
      loadingText: true,
      show: false,
      params: {
        token: '123456798',
        name: 'avatar'
      },
      headers: {
        "Authorization": `Bearer ${this.$cookies.get('token')}`
      },
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
      // this.$axios.$post('/upload_file', data)
      //     .then((response) => {
      //         this.course.course_image = response.file
      //     })
      //     .catch((error) => {
      //     })
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
      this.$store.dispatch('socillMedia/uploadImage', dataForm)
        .then((response) => {
          this.post.image = response
        })
        .catch((error) => {
        })
    },
    isTrueDimensions(file) {
      let reader = new FileReader();
      let img = new Image();
      try {
        reader.readAsDataURL(file);
        reader.onload = evt => {
          img.src = evt.target.result;
        }
        // if(img.height / img.width !== 1) {
        //   return false;
        // }
        // else if(img.height<640 || img.height >3840) {
        //   return false;
        // }
        // else if (img.width < 360 || img.width >2160) {
        //   return false;
        // }
        return true;
      } catch (e) {
        return false;
      }
    },
    async saveStory() {
      this.loadingbtn = true
      this.loadingText = false
      await this.$store.dispatch('socillMedia/createStory', {
        image_id: this.image ? this.image.id : null
      })
        .then(res => {
          console.log(this.image.id, 'مممممممم')

          this.$snotify.success('با موفقیت ایجاد شد', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          })
          this.$router.push('/socialmedia')
        })
        .catch(async err => {
          console.log(this.image.id, 'ddddd')
          const keys = Object.keys(err.response.data.errors);
          for (let i = 0; i < keys.length; i++) {
            for (let j = 0; j < err.response.data.errors[keys[i]].length; j++) {
              await this.$snotify.error(err.response.data.errors[keys[i]][j], {
                timeout: 2000,
                showProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true
              })
            }
          }
        })
    },
    toggleShow() {
      this.show = !this.show;
    },
    cropSuccess(imgDataUrl, field) {
      // this.image = imgDataUrl;
    },
    cropUploadSuccess(jsonData, field) {
      // this.image = imgDataUrl;
      console.log(jsonData, 'jsonData')
      this.image = jsonData.data
      this.show = false
    },
    cropUploadFail(status, field) {
    }
  }
}
</script>
