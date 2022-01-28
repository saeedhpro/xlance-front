<template>
  <div class="container">
    <button @click="back" class="absolute px-5 py-2 border-solid border-2 border-gray-600 text-gray-600 rounded-lg">
      <i class="far fa-chevron-right"></i>
      <span class="mr-3">بازگشت به پنل کابری</span>
    </button>
    <div class="md:mt-0 mt-20 flex justify-center ">
      <div class="text-center items-center flex flex-col">
        <img src="/images/logo.png"/>
        <div class="my-10 text-black text-2xl ir-medium">ایجاد پروژه جدید</div>
        <img src="/images/Path147.png"/>
      </div>
    </div>
    <div class="my-10 flex items-center">
      <div class="w-12 h-12 px-5 pt-2 bg-purple-600 text-white rounded-full text-2xl">۱</div>
      <div class="mr-5 ir-bold text-black">درباره ی پروژه ی خود بنویسید</div>
    </div>

    <div>
      <div class="text-lg text-black ir-medium">عنوان پروژه شما</div>
      <div class="my-5 text-sm text-gray-600">عنوان پروژه خود را به دقت انتخاب نمایید. در کوتاه ترین جمله، به صورت واضح بیان کنید که چه می‌خواهید</div>
      <input class="w-full py-2 px-5 border-solid border-2 border-gray-400 rounded-lg placeholder-gray-400" v-model="project.title" placeholder="عنوان پروژه خود را بنویسید">
    </div>

    <div class="mt-10">
      <div class="text-lg text-black ir-medium">توضیحات پروژه</div>
      <div class="my-5 text-sm text-gray-600">هر چه توضیحات بیشتر و واضح‌تر باشد، فریلنسرها خواسته شما را بهتر متوجه می‌شوند و سریعتر به آنچه می‌خواهید می‌رسید</div>
<!--      <textarea class="w-full h-40 py-2 px-5 border-solid border-2 border-gray-400 rounded-lg placeholder-gray-400" v-model="project.description" ></textarea>-->
      <client-only placeholder="loading...">
        <ckeditor-nuxt  v-model="project.description" :config="editorConfig" class="w-full h-40 py-2 px-5 border-solid border-2 border-gray-400 rounded-lg placeholder-gray-400"  />
      </client-only>
<!--      <input v-html="text" v-model="project.description" class="w-full h-40 py-2 px-5 border-solid border-2 border-gray-400 rounded-lg placeholder-gray-400"/>-->

      <div class="flex mt-5 attachment-box">
        <div class="w-full md:w-2/3 uploader-box">
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
              accept="image/x-eps,image/jpeg,image/gif,image/png,application/pdf"
              @change="selectFiles()"
            >
          </div>
        </div>
        <div class="w-full md:w-1/3 attachments-list">
          <div
            class="attachment-item"
            v-for="(f, i) in project.new_attachments"
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
    </div>

    <!--    <div class="mt-10">-->
    <!--      <Dropzone/>-->
    <!--    </div>-->

    <div class="mt-10">
      <div class="text-lg text-black ir-medium">مهارت‌های مورد نیاز شما</div>
      <div class="my-5 text-sm text-gray-600">مهارت‌هایی که برای انجام پروژه شما لازم است را انتخاب کنید</div>
      <!--        <input class="w-full py-2 px-5 border-solid border-2 border-gray-400 rounded-lg placeholder-gray-400">-->
      <MultiSelect v-model="selected_skills" :options="skills" @changed="onChange" class="border-solid border-2 border-gray-400 rounded-lg" />
    </div>

    <div class="my-10 flex items-center">
      <div class="w-12 h-12 px-4 pt-2 bg-purple-600 text-white rounded-full text-2xl">۲</div>
      <div class="mr-5 ir-bold text-black">بودجه مد نظر شما چقدر است؟</div>
    </div>

    <div class="sm:-mx-1 flex flex-wrap justify-between">
      <div class="w-full sm:px-1  sm:w-1/2 flex flex-col">
        <span class="my-5 text-black ir-medium">حداقل</span>
        <input class=" px-5 h-10 border-gray-400 border-2 border-solid rounded-lg" v-model="project.min_price ">
      </div>
      <div class="w-full sm:px-1 sm:w-1/2 flex flex-col">
        <span class="my-5 text-black ir-medium">حداکثر</span>
        <input class=" px-5 h-10 border-gray-400 border-2 border-solid rounded-lg" v-model="project.max_price">
      </div>
    </div>

    <div class="my-10 flex items-center">
      <div class="w-12 h-12 px-4 pt-2 bg-purple-600 text-white rounded-full text-2xl">۳</div>
      <div class="mr-5 ir-bold text-black">برای پروژه خود امکانات خاص در نظر بگیرید</div>
    </div>

    <div>
      <div class="my-3 text-black ir-medium">امکانات خاص پروژه شما</div>
      <div class="text-gray-600">با وجود امکانات خاص، پروژه شما بیشتر دیده می‌شود</div>
    </div>

    <div class="pb-5 border-b-2 border-gray-400">
      <div class="mt-10 flex items-center">
        <div class="mr-2 text-black">ایجاد پروژه (پیش فرض) - {{ settings.project_price.toLocaleString() | toPersianNumber}} <span class="text-sm text-gray-500">ریال</span></div>
      </div>
      <div class="mt-3 text-sm text-gray-900">پروژه شما در معرض دید فریلنسرها قرار می‌گیرد</div>
    </div>
    <div class="pb-5 border-b-2 border-gray-400" v-if="getPropertyCraeteProject.length > 0" v-for="i in getPropertyCraeteProject"  >
      <div class="flex">
        <v-container fluid>
          <v-checkbox :value="i.id" v-model="new_properties">
            <template v-slot:label>
              <div class="flex items-center" >
                <v-tooltip bottom >
                  <template v-slot:activator="{ on }" >
                    <div class="mx-3 p-2 text-sm bg-pink-100 text-pink-200 rounded-lg" style="display:flex;width: 100px" :style="`background-color: ${i.bg_color}`">
                      <!--                        <i class="fas fa-forward ir-medium" ></i>-->
                      <img class="w-5 h-5 mx-auto" v-if="i.icon" :src="i.icon.path">
                      <span class="mr-2 ir-medium mx-auto" :style="`color: ${i.color}`" >{{i.name}}</span>
                    </div>
                  </template>
                </v-tooltip>
                <div class="mr-3 text-black ir-medium"><span>{{i.name}}</span> <span class="mx-3">-</span> <span>{{i.price | toPersianNumber}}</span> <span class="text-sm text-gray-500">ریال</span></div>
              </div>
            </template>
          </v-checkbox>
        </v-container>
      </div>
      <div class="-mt-3 text-sm text-gray-900">{{i.description}}</div>
    </div>

    <div class="my-20">
      <div class="sm:w-1/2 m-auto px-10 border-dashed border-2 border-gray-500 rounded-lg">
        <div class="py-10 border-b-2 border-dashed border-gray-500 flex justify-between">
          <div class="text-gray-700 ir-medium text-lg">موجودی کیف پول شما</div>
          <div class="text-gray-700 "> <span class="ir-medium text-lg" >{{getBalance.toLocaleString() | toPersianNumber}}</span>
            ریال</div>
        </div>
        <div class="py-10 flex justify-between">
          <div class="text-gray-700 ir-medium text-lg">هزینه خدمات</div>
          <div class="text-gray-700 "> <span class="ir-medium text-lg">{{calcCost.toLocaleString() | toPersianNumber}}</span>
            ریال</div>
        </div>
      </div>
    </div>
    <div class="my-10 text-center text-white" v-if="calcCost > getBalance">
      <button type="button" class="w-64  h-10 p-1 ir-medium  rounded-lg bg-greentype" @click="createProject">
        <span v-if="loadingText">پرداخت و ایجاد پروژه</span>
        <img src="/images/Rolling-1s-200px.svg" v-if="loadingbtn" class="mx-auto w-5 h-5"/>

      </button>
    </div>
    <div class="my-10 text-center text-white" v-else>
      <button type="button" class="w-64  h-10 p-1 ir-medium  rounded-lg bg-greentype" @click="createProject">
        <span v-if="loadingText">ایجاد پروژه</span>
        <img src="/images/Rolling-1s-200px.svg" v-if="loadingbtn" class="mx-auto w-5 h-5"/></button>
    </div>
    <client-only>
      <vue-snotify></vue-snotify>
    </client-only>
  </div>
</template>

<script>
    import MultiSelect from "../../components/dashboard/global/MultiSelect";
    import Dropzone from "../../components/Dropzone";
    export default {
        name: "index",
        components: {Dropzone, MultiSelect,
            'ckeditor-nuxt': () => { if (process.client) { return import('@blowstack/ckeditor-nuxt') } },
        },
        layout:'createPro',
        middleware:'auth',
        data(){
            return{
                onchange:false,
                selected_skills:[],
                files: [],
                properties:[],
                new_properties:[],
                project: {
                    new_properties: [],
                    new_skills: [],
                    new_attachments: [],
                    title: null,
                    description: null,
                    min_price:null,
                    max_price:null,
                },
                editorConfig: {
                    simpleUpload: {
                        uploadUrl: 'https://api.xlance.ir/api/upload',
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            'Authorization': this.$cookies.get('token')
                        }
                    },
                    plugins:[
                        'Alignment',
                        'BlockQuote',
                        'Bold',
                        'Italic',
                        'Link',
                        'List',
                        'ListStyle',
                        'Code',
                        'FontFamily',
                        // 'FontColor',
                        // 'FontSize',
                        // 'Heading',
                        // 'Highlight',
                    ],
                    toolbar:[
                        'Alignment',
                        'BlockQuote',
                        'Bold',
                        'Italic',
                        'Link',
                        'List',
                        'ListStyle',
                        'Code',
                        'FontFamily',
                        'FontColor',
                        'FontSize',
                        'Heading',
                        'Highlight',
                        'Image',
                        'ImageCaption',
                        'ImageResize',
                        'ImageStyle',
                        'ImageUpload',
                        'Table',
                        'SimpleUploadAdapter'
                    ]
                },
              loadingbtn : false,
              loadingText :true
            }
        },

        methods: {
            createProject() {
                const p = {
                    ...this.project,
                    new_skills:this.selected_skills.map(p => p.id),
                    new_properties: this.new_properties,
                    new_attachments: this.project.new_attachments.map(p => p.id),
                    freelancer_id: this.$route.query.id
                }
                this.loadingbtn = true
              this.loadingText = false
                this.$store.dispatch('project/getCreateProject',p )
                    .then(res=>{
                        if(res.action) {
                            window.location.href = res.action;
                        } else {
                            this.$snotify.success('پروژه با موفقیت ایجاد شد', {
                                timeout: 2000,
                                showProgressBar: false,
                                closeOnClick: false,
                                pauseOnHover: true
                            })
                            setTimeout(() => {
                                this.$router.replace('/myProject')
                            }, 500)
                        }
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
            onChange(skills) {
                this.selected_skills = skills
            },
            back() {
                this.$router.back();
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
                        this.project.new_attachments.push(file);
                    }
                }
            },
            deleteAttachment(id) {
                this.project.new_attachments = this.project.new_attachments.filter(f => f.id !== id);
            }
        },
        computed:{
            getBalance()
            {
                return  this.$store.getters['user/getBalance']
            },
            getSettings(){
                return this.$store.getters['user/getSettings']
            },
            calcCost() {
           const ps = this.getPropertyCraeteProject.filter(i => {
             return this.new_properties.includes(i.id)
           })
                let cost = this.getSettings.project_price;
                cost = ps.reduce((total, p) => {
                    return total + p.price;
                }, cost);
                return cost
            },
            getPropertyCraeteProject(){
                return this.$store.getters['propertyAdmin/getPropertyCraeteProject']
            },
            settings:{
                get(){
                    return this.$store.getters['user/getSettings']
                },
            },
            skills() {
                return this.$store.getters['skills/getSkills']
            }
        },
        mounted() {
            this.$store.dispatch('propertyAdmin/getPropertyCraeteProject')
            this.$store.dispatch('skills/getSkills')
        },
      head(){
        return {
          title: 'ایجاد پروژه'
        }
      },
    }
</script>
