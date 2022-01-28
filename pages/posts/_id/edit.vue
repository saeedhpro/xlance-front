<template>
    <div class="container bg-white rounded-lg shadow-lg">
      <div class="border-b-2 border-gray-300 justify-between">
        <div class="w-32 pb-4 text-md text-black border-b-4 border-greenFreelancer ir-medium">پست جدید</div>
      </div>
      <div class="my-10 text-center text-gray-600 w-80">از طریق این بخش می‌توانید یک تصویر و توضیحات مربوط به آن را به عنوان یک «پست» در پروفایل خود قرار دهید دیگر کاربران می‌توانند پست شما را پسند کرده و نظر خود را ارسال کنند</div>
      <div class="flex justify-between">
        <div class="w-full h-full items-center text-center">
          <div class="p-2  upload-box-title-box rounded-lg bg-gray-100 text-center  relative"
               @click="onUploadClicked">
            <div class="p-10 text-center border-2 border-dashed border-gray-500 rounded-lg">
              <div class="upload-box-title-text text-gray-700 ir-medium text-sm">
                تصویر پست شما
              </div>
              <img src="/images/postSize.png"/>
              <div class="upload-box-title-input">
                <img src="/images/upload-icon.png">
                <div class="flex m-auto w-32 border-2 py-2 px-1 rounded-lg border-solid border-gray-500 text-gray-600 bg-gray-200 justify-center  text-sm">
                  <i class="fal fa-upload"></i>
                  <div class=" mr-2">آپلود تصویر</div>
                </div>
                <input ref="upload1" accept="image/jpeg,png" type="file" hidden @change="onFile">
                <img src=""/>
              </div>
              <img
                v-if="base64"
                ref="upload-placeholder"
                alt=""
                class="w-full  h-full upload-placeholder rounded-lg absolute inset-0	"
                :src="base64"
                @click="onUploadClicked"
              >
            </div>

          </div>
        </div>
        <div>
          <div>
            <div class="my-3 text-sm text-gray-600">توضیحات پست</div>
            <textarea class="border-2 border-solid border-gray-600 rounded-lg w-full"></textarea>
          </div>
          <v-col>
            <v-checkbox
              v-model="ex4"
              label="قوانین و مقررات ارسال پست در ایکس‌لنس را خوانده‌ام و با آنها موافقم"
              color="success"
              value="success"
              hide-details
              class="text-black text-smpa"
            ></v-checkbox>
          </v-col>
          <div class="my-10 text-left text-white">
            <button type="button" class="w-64 h-10 p-1 ir-medium  rounded-lg bg-greentype">قرار دادن پست</button>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import Select from "../../../components/dashboard/Select";
    export default {
        name: "Edit",
        layout:'dashboard',
        components: {Select},
        middleware:'auth',

        validate ({ params }) {
            return /^\d+$/.test(params.id)
        },
        async asyncData ({ params, $axios }) {
            let teachers = []
            const id = params.id
            let course = null
            await $axios.$get(`/course/${id}`)
                .then((response) => {
                    course = response
                })
                .catch((error) => {
                })
            await $axios.get('/users/0/100000000')
                .then((response) => {
                    teachers = response.data.users_info
                })
                .catch((error) => {
                })
            return {
                course,
                teachers
            }
        },
        data(){
            return{
                base64: null,
                showSessionModal: false,
                courseAdded: false,
                ex4: ['success'],
            }
        },
        methods: {
            onUploadClicked () {
                this.$refs.upload.click()
            },
            onUploadClicked1 () {
                this.$refs.upload1.click()
            },
            async onFileDrop (e) {
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
            async onFile (e) {
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
        }

    }
</script>
