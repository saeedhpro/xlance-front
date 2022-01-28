<template>
  <div class="container py-2 px-10 bg-white rounded-lg shadow-lg">
    <div v-if="!showList">
      <div class="pb-2 mb-2 flex border-b-2 border-gray-300">
        <div class="pb-3 text-sm text-gray-500 ir-medium"  @click="status='1'" :class="{'select' : status==='1'}">نمونه کار جدید</div>
      </div>
      <div class="flex flex-wrap lg:-mx-2">

        <div class="lg:w-3/5 lg:px-2 md:w-full sm:w-full">
          <div class="w-full items-center text-center">
            <div class="p-2  upload-box-title-box rounded-lg bg-gray-100 text-center relative">
              <div class="text-center border-2 border-dashed border-gray-500 rounded-lg">
                <img v-if="image" :src="image.path" class="mx-auto rounded-lg"/>
                <div class="p-10" v-else>
                <div class="text-sm text-gray-700">تصویر نمونه کار</div>
                <img src="/images/por.png" class="h-40 my-5 mx-auto" alt=""/>
                <div class="my-3 text-gray-600 text-sm">فرمت‌های فایل مورد پذیرش برای تصویر (حداکثر حجم مورد پذیرش: ۱۰ مگابایت)</div>
                <div class="my-3 flex justify-center">
                  <div class="px-2 py-1 bg-gray-200 rounded text-gray-600">PNG</div>
                  <div class="px-2 py-1 mx-1 bg-gray-200 rounded text-gray-600">JPG</div>
                  <div class="px-2 py-1 ml-1 bg-gray-200 rounded text-gray-600">JPEG</div>
                  <div class="px-2 py-1 bg-gray-200 rounded text-gray-600">GIF</div>
                </div>
                <div class="upload-box-title-input">
                  <img src="/images/upload-icon.png" alt="">
                  <button class="flex m-auto w-32 border-2 py-2 px-1 rounded-lg border-solid border-gray-500 text-gray-600 bg-gray-200 justify-center text-sm"
                       @click="toggleShow">
                    <i class="fal fa-upload"></i>
                    <div class=" mr-2">آپلود تصویر</div>
                  </button>
                  <my-upload field="file"
                             @crop-success="cropSuccess"
                             @crop-upload-success="cropUploadSuccess"
                             @crop-upload-fail="cropUploadFail"
                             v-if="show"
                             :width="720"
                             :height="450"
                             url="https://api.xlance.ir/api/upload"
                             noRotate = "false"
                             noSquare = "false"
                             noCircle = "false"
                             langExt
                             langType = "en"
                             imgFormat ="image/jpeg,png"
                             :params="params"
                             :headers="headers"
                             img-format="png"></my-upload>
<!--                  <input ref="upload" accept="image/jpeg,png" type="file" hidden @change="onFile">-->
                  <img src="" alt=""/>
                </div>
<!--                <img-->
<!--                  v-if="base64"-->
<!--                  ref="upload-placeholder1"-->
<!--                  alt=""-->
<!--                  class="w-full  h-full upload-placeholder rounded-lg absolute inset-0	"-->
<!--                  :src="base64"-->
<!--                  @click="onUploadClicked"-->
<!--                >-->
              </div>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:w-2/5 w-full lg:px-2">
          <div class="mb-4">
            <label class="text-sm my-5 ir-medium text-gray-700">عنوان</label>
            <input class="w-full mt-2 px-3 py-3 flex justify-between  border-2 border-solid border-gray-500 rounded-xl" v-model="title" placeholder="عنوان نمونه کار خود را وارد کنید">
          </div>
          <div class="my-4">
            <label class="text-sm my-5 ir-medium text-gray-700">توضیحات</label>
            <textarea class="w-full h-32 mt-2 px-3 py-3 flex justify-between  border-2 border-solid border-gray-500 rounded-xl" v-model="description"></textarea>
          </div>
          <div class="my-4">
            <label class="text-sm my-5 ir-medium text-gray-700">مهارت های استفاده شده</label>
            <!--    <AutoCompletes :people="people"/>-->
<!--            <input class="w-full mt-2 px-3 py-3 flex justify-between  border-2 border-solid border-gray-500 rounded-xl">-->
            <MultiSelect v-model="selected_skills" :options="skills" @changed="onChange" class="w-full py-2 px-5 border-solid border-2 border-gray-500 rounded-lg placeholder-gray-400" />
          </div>
          <div class="my-4">
            <label class="text-sm my-5 ir-medium text-gray-700">برچسب ها</label>

<!--            <div>-->
<!--              <MultiSelect @changed="tagChanged" v-model="tagList" tag-placeholder="افزودن برچسب" placeholder="" label="name" track-by="name" :options="tags" :multiple="true" :taggable="true" @tag="addTag" class="w-full py-2 px-5 border-solid border-2 border-gray-500 rounded-lg placeholder-gray-400"></MultiSelect>-->
<!--            </div>-->
            <div class="text-sm text-gray-500 ir-light">بعد از وارد کردن هر برچسب، "اینتر" را کلیک کنید </div>
            <input  type="text" class="w-full py-2 px-5 border-solid border-2 border-gray-500 rounded-lg placeholder-gray-400" @keydown.enter="addTags" v-model="tagList">
            <div class="flex flex-wrap justify-start pa-3 languages-box">
              <span @click="removeTag(l)" v-for="(l,i) in tags" :key="i" class="ir-light m-2 bg-purple-600 text-white rounded-2xl click" style="color: #EEEEEE; padding: 8px;">{{l}}</span>
            </div>
          </div>

        </div>
        <div class="flex w-full mt-5 attachment-box">
          <div class="w-full md:w-3/5 uploader-box">
            <div class="list-bg">
              <p class="title">فایل‌های ضمیمه</p>
              <p class="desc">از این قسمت می‌توانید حداکثر تا ۵ فایل را ضمیمه پروژه خود کنید (حداکثر حجم هر فایل: ۱۰ مگابایت)</p>
              <div class="upload-btn click" @click="openUploader">
                <i class="fal fa-upload"></i>
                آپلود فایل
              </div>
              <input
                ref="uploader"
                class="upload-input"
                type="file"
                multiple
                accept="image/*"
                @change="selectFiles()"
              >
            </div>
          </div>
          <div class="w-full md:w-2/5 attachments-list">
            <label class="text-sm my-5 ir-medium text-gray-700">فایل های ضمیمه شده</label>
            <div
              class="attachment-item"
              v-for="(f, i) in new_attachments"
              :key="i"
            >
              <div class="attachment-item-name">
                <i class="fal fa-file"></i>
                <div class="attachment-name">
                  {{f.name}}
                </div>

              </div>
              <div class="click attachment-delete" @click="deleteAttachment(f.id)">
                <i class="fal fa-trash"></i>
              </div>
            </div>
          </div>
        </div>
<div class="mt-5 flex-col mx-auto">
        <div class="flex items-center ir-medium align-center justify-start">
          <v-checkbox
            v-model="ex4"
            color="greenFreelancer"
            value="success"
          ></v-checkbox>
          <div class="-mt-4 mr-2 text-gray-700 text-sm"><span class="text-greenFreelancer text-sm underline ">قوانین و مقررات ثبت نمونه کار</span> در ایکس لنس را خوانده ام و با آنها موافقم</div>
        </div>
        <div class="mt-5 mb-10  mx-auto text-center text-white">
          <button type="button" class="w-64 h-10 p-1 ir-medium  rounded-lg bg-greentype btnSave" :disabled="!ex4" @click="savePortfolios">
            <img src="/images/Rolling-1s-200px.svg" v-if="loadingbtn" class="mx-auto w-12 h-8" alt=""/>
            <span v-if="loadingText">ثبت نمونه کار</span></button>
        </div>
</div>
      </div>
    </div>
    <div v-else>
      <div class="pb-2 mb-2 flex border-b-2 border-gray-300">
        <div class="pb-3 text-sm text-gray-500 ir-medium"  @click="status='1'" :class="{'select' : status==='1'}">نمونه کارها</div>
      </div>
      <div class="justify-start flex flex-wrap">
        <button class="m-2 ml-8 sm:w-56 w-full">
          <div class=" p-2  upload-box-title-box rounded-lg bg-gray-100 text-center" @click="showList=false" style="
            width: 245px;
    height: 245px;
    border-radius: 8px;
    opacity: 1;">
            <div>
              <i class="fal fa-plus-circle mt-20 w-24 text-gray-700"></i>
              <div class=" mt-5 upload-box-title-text text-gray-700">
                نمونه کار جدید
              </div>
            </div>
          </div>
        </button>
        <nuxt-link :to="`/portfolios/${i.id}`" class="port_box relative m-2 "  :key="n" v-for="(i, n) in listPortfolios">
          <div class="  upload-box-title-box relative">
            <img v-if="i.images.length>0" :src="i.images[0].path" alt=""/>

            <div class="port_dis absolute">
            <div class="mx-auto text-center text-white" v-show="i.status == 'accepted'">{{i.title}}</div>
            <div class="p-2 text-white border-solid border-white hover:border-pink-200 hover:text-pink-200 border-2 rounded-lg text-center" v-if="i.status == 'accepted'" @click="deletePortfolios(i.id)">حذف نمونه کار</div>
            <div class="p-2 text-gray-600 border-solid border-white border-2 bg-white rounded-lg text-center" v-else>
              <span class="mt-2 ml-1"> <i class="fal fa-clock "></i></span>در حال بررسی</div>
          </div>
            <div class="cover_owerly1 mx-3"></div>
          </div>
        </nuxt-link>
      </div>
    </div>
    <client-only>
      <vue-snotify></vue-snotify>
    </client-only>
  </div>
</template>
<script>
    import Select from "../Select";
    import AutoCompletes from "./AutoCompletes";
    import MultiSelect from "../global/MultiSelect";
    import myUpload from 'vue-image-crop-upload/upload-2';
    import 'babel-polyfill';
    export default {
        name: "index",
        components:{
            MultiSelect,
            AutoCompletes,
            Select,
          'my-upload': myUpload
        },
        layout:'account',
        data(){
            return{
                title:null,
                description:null,
                status:'1',
                showList:true,
                base64: null,
                showSessionModal: false,
                courseAdded: false,
                files:[],
                new_skills:[],
                new_attachments:[],
                tags:[],
                tagList:null,
                ex4: false,
                onchange:false,
                selected_skills:[],
              languages:[],
              language: null,
              loadingText : true,
              loadingbtn : false,
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
          addTags() {
            const l = this.tags.find(i => i == this.tagList);
            if(!l) {
              const tagList = this.tagList
              this.tags = [
                ...this.tags.slice() , tagList
              ]
              this.tagList = null;
            }
          },
          removeTag(lang) {
            const l = this.tags.findIndex(i => i == lang);
            if(l > -1) {
              // this.languages.splice(l,1);
              this.tags = [
                ...this.tags.filter(i => i != lang)
              ]
            }
          },
            onChange(skills) {
                this.selected_skills = skills
            },
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
                this.$store.dispatch('skills/uploadImage', dataForm)
                    .then((response) => {
                        this.image = response
                    })
                    .catch((error) => {
                    })
            },
            savePortfolios(){
                const new_images = this.image ? [this.image.id] : [];
                this.loadingbtn = true
              this.loadingText = false
                this.$store.dispatch('account/createPortfolios',{
                    title:this.title,
                    description:this.description,
                    skills: this.selected_skills.map(i => i.id),
                    tags: this.tags,
                    new_attachments:this.new_attachments.map(p => p.id),
                    new_images
                })
                    .then(res=>{
                        this.showList=true
                    })
                    .catch(async err => {
                        const keys = Object.keys(err.response.data.errors);
                        for (let i = 0; i < keys.length; i++){
                            for (let j = 0; j < err.response.data.errors[keys[i]].length; j++){
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
            openUploader() {
              this.$refs.uploader.click();
            },
            selectFiles() {
              this.files = this.$refs.uploader.files;
              if(this.files.length > 5) {
                this.files = this.files.slice(0, 5);
              }
              this.uploadFiles();
            },
            async uploadFiles() {
              const files = this.files;
              if(files.length > 0) {
                for (let i = 0; i < files.length; i++) {
                  const dataForm = new FormData();
                  dataForm.set('file', files[0]);
                  const file = await this.$store.dispatch('account/uploadImage', dataForm);
                  this.new_attachments.push(file);
                }
              }
            },
            deleteAttachment(id) {
              this.new_attachments = this.new_attachments.filter(f => f.id !== id);
            },
            deletePortfolios(id){
                this.$swal('آیا مطمئن هستید؟')
                    .then(res => {
                        if(res.value) {
                            this.$store.dispatch('skills/deletePortfolios',id)
                                .then(res => {
                                    this.$snotify.success('با موفقیت حذف شد', {
                                        timeout: 2000,
                                        showProgressBar: false,
                                        closeOnClick: false,
                                        pauseOnHover: true
                                    })
                                })
                        }
                    })
            },
            // addTag (newTag) {
            //     const tag = {
            //         name: newTag,
            //     };
            //     this.tags.push(tag);
            //     this.tagList.push(tag);
            // }
          toggleShow() {
            this.show = true;
          },
          cropSuccess(imgDataUrl, field){
            // this.image = imgDataUrl;
          },
          cropUploadSuccess(jsonData, field){
            // this.image = imgDataUrl;
            console.log(jsonData , 'jsonData')
            this.image = jsonData.data
            this.show = false
          },
          cropUploadFail(status, field){
          }
        },
        computed:{
            listPortfolios(){
                return this.$store.getters['account/getUserPortfolios']
            },

            skills() {
                return this.$store.getters['skills/getSkills']
            }
        },
        async mounted() {
            this.$nextTick(async () => {
                this.$nuxt.$loading.start()
                await this.$store.dispatch('skills/getSkills')
                await this.$store.dispatch('account/getUserPortfolios')
                this.$nuxt.$loading.finish()
            })
        }

    }
</script>

<style>
  .v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    position: absolute;
    width: 100%;
  }
  .btnSave[disabled]{
    background-color: red!important;
  }
  .image {
    display: block;
    width: 100%;
  }

  .overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    transition: .5s ease;
    background-color: #616161;
  }

  .img-o:hover .overlay {
    opacity: 1;
  }

  .btn-clock {
    position: absolute;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: center;
  }
  .port_box img{
    width: 245px;
    height: 245px;
    border-radius: 8px;
    opacity: 1;
  }
  .port_box:hover .port_dis{
    display: block;
    z-index: 9999;
    bottom: 20px;
    right: 10px;
    left: 10px;
  }
  .port_box:hover .cover_owerly1{
    display: block;
    width: 100%;
    height: 60%;
    position: absolute;
    background-image: linear-gradient(to top,#000000, #000000, #00000066, #00000033, #00000000);
    opacity: 0.6;
    border-radius: 0 0 10px 10px;
    margin-top: -147px;
    margin-right: initial;
  }
  .cover_owerly1{
    display: none;
  }
  .port_dis{
    display: none;
  }
</style>
