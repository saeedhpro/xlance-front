<template>
  <div class="container bg-white rounded-lg shadow-lg">
    <div class="px-3">
      <div class="pb-2 mb-2 border-b-2 border-gray-300 flex justify-between items-center">
        <div class="pb-3 text-sm text-gray-500 ir-medium"  @click="status='1'" :class="{'select' : status==='1'}">استوری جدید</div>
        <nuxt-link to="/socialMedia" class="text-greenFreelancer underline">برگشت</nuxt-link>
      </div>
      <div class="my-10 mx-auto text-center text-gray-600" style="max-width: 700px">از طریق این بخش می‌توانید یک تصویر را به مدت ۲۴ ساعت به عنوان یک «استوری» در پروفایل خود قرار دهید دیگر کاربران می‌توانند استوری شما را در این مدت مشاهده کنند</div>
      <div class="flex justify-center">
        <div class="sm:w-1/3 h-90 items-center text-center">
          <div class="p-2  upload-box-title-box rounded-lg bg-gray-100 text-center  relative"
               @click="onUploadClicked">
            <div class="p-10 text-center border-2 border-dashed border-gray-500 rounded-lg">
              <div class="upload-box-title-text text-gray-700 ir-medium text-sm">
                تصویر استوری شما
              </div>
              <div class="my-20">
                <img src="/images/storiSize.png">
              </div>
              <div class="my-3 text-gray-600 text-sm">فرمت‌های فایل مورد پذیرش برای تصویر (حداکثر حجم مورد پذیرش: ۱۰ مگابایت)</div>
              <div class="my-3 flex justify-center">
                <div class="px-2 py-1 bg-gray-200 rounded text-gray-600">PNG</div>
                <div class="px-2 py-1 mx-1 bg-gray-200 rounded text-gray-600">JPG</div>
                <div class="px-2 py-1 ml-1 bg-gray-200 rounded text-gray-600">JPEG</div>
                <div class="px-2 py-1 bg-gray-200 rounded text-gray-600">GIF</div>
              </div>
              <div class="my-5 upload-box-title-input">
                <img src="/images/upload-icon.png">
                <div class="flex m-auto w-32 border-2 py-2 px-1 rounded-lg border-solid border-gray-500 text-gray-600 bg-gray-200 justify-center  text-sm">
                  <i class="fal fa-upload"></i>
                  <div class=" mr-2">آپلود تصویر</div>
                </div>
                <input ref="upload" accept="image/jpeg,png" type="file" hidden @change="onFile">
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
      </div>
      <div class="flex items-center align-center justify-start">
        <v-checkbox
          v-model="ex4"
          color="greenFreelancer"
          value="success"
        ></v-checkbox>
        <div class="-mt-4 mr-2 text-gray-700 text-sm"><span class="text-greenFreelancer text-sm ">قوانین و مقررات قرار دادن استوری</span> در ایکس لنس را خوانده ام و با آنها موافقم</div>
      </div>
      <div class="my-10 text-center text-white">
        <button type="button" class="w-64 h-10 p-1 ir-medium  rounded-lg bg-greentype btnSave" :disabled="!ex4 && !image" @click="saveStory">قرار دادن استوری</button>
      </div>

    </div>
  </div>
</template>
<script>
  import Select from "../../../components/dashboard/Select";
    export default {
        name: "CreateStory",
        layout:'admin',
        components:{Select},
        middleware:'admin',
        data () {
            return {
                base64: null,
                showSessionModal: false,
                courseAdded: false,
                ex4: false,
                status:'1',
                image:null
            }
        },
        methods: {
            onUploadClicked () {
                this.$refs.upload.click()
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
                const file = e.target.files[0];
                const base64 = await this.$toBase64(e.target.files[0])
                this.base64 = base64.data
                const data = new FormData()
                data.set('file_type', base64.type)
                data.set('base64_file', base64.base64)
                const dataForm = new FormData();
                dataForm.set('file', file);
                this.$store.dispatch('socillMedia/uploadImage', dataForm)
                    .then((response) => {
                        this.image = response
                    })
                    .catch((error) => {
                    })
            },
            async saveStory(){
                await this.$store.dispatch('socillMedia/createStory',{
                    image_id:this.image ? this.image.id :null
                })
                    .then(res=>{
                        this.$router.replace('/admin/SoclialMediaAdmin/StoreisList')
                        this.$swal('با موفقیت ثبت شد', {
                            icon: 'success'
                        });
                    })
                    .catch(err=>{
                    })
            }
        }
    }
</script>
