<template>
  <div class="container">
    <form
      v-if="article"
      id="app"
      @submit="checkForm"
      action="https://vuejs.org/"
      method="post"
      class="w-full sm:w-80 p-3 rounded-lg border-2 border-gray-500 border-solid"
    >
      <div v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </div>

      <div>
        <label for="name">عنوان مقاله</label>
        <input
          id="name"
          v-model="article.title"
          type="text"
          name="name"
          class="w-full rounded-lg border-2 border-gray-500 border-solid"
        >
      </div>

      <div class="mt-6 mb-6">
        <label for="description">توضیحات مقاله</label>
        <client-only placeholder="loading...">
          <ckeditor-nuxt v-model="article.body" :config="editorConfig"  />
        </client-only>


      </div>
      <label>عکس مقاله</label>
      <img v-if="article.thumbnail && !base64" :src="article.thumbnail.path"/>
      <div class="sm:w-full items-center text-center">
        <div class="p-2  upload-box-title-box rounded-lg bg-gray-100 text-center  relative"
             @click="onUploadClicked">
          <div class="p-10 text-center flex flex-col border-2 border-dashed border-gray-500 rounded-lg">
            <div class="upload-box-title-text text-gray-700 ir-medium text-sm">
              تصویر مقاله
            </div>
            <div class="my-3 text-gray-600 text-sm">فرمت‌های فایل مورد پذیرش برای تصویر (حداکثر حجم مورد پذیرش: ۱۰ مگابایت)</div>
            <div class="my-3 flex justify-center">
              <div class="px-2 py-1 bg-gray-200 rounded text-gray-600">PNG</div>
              <div class="px-2 py-1 mx-1 bg-gray-200 rounded text-gray-600">JPG</div>
              <div class="px-2 py-1 ml-1 bg-gray-200 rounded text-gray-600">JPEG</div>
              <div class="px-2 py-1 bg-gray-200 rounded text-gray-600">GIF</div>
            </div>
            <div class="my-5 upload-box-title-input">
              <!--            <img src="/images/upload-icon.png">-->
              <div class="flex m-auto w-32 border-2 py-2 px-1 rounded-lg border-solid border-gray-500 text-gray-600 bg-gray-200 justify-center  text-sm">
                <i class="fal fa-upload"></i>
                <div class=" mr-2">آپلود تصویر</div>
              </div>
              <input ref="upload" accept="image/jpeg,png" type="file" hidden @change="onFile">
            </div>
            <img
              v-if="base64"
              ref="upload-placeholder"
              alt=""
              class="w-full  h-full upload-placeholder rounded-lg absolute inset-0"
              :src="base64"
              @click="onUploadClicked"
            >
          </div>
        </div>
      </div>


      <div class="mt-6 mb-6">
        <label for="movie">انتخاب دسته بندی</label>
        <select
          id="movie"
          v-model="article.category.id"
          name="movie"
          class="w-full rounded-lg border-2 border-gray-500 border-solid"

        >
          <option v-for="(i , index) in category" :key="index" :value="i.id" >{{i.name}}</option>
        </select>
      </div>

      <!--    <p>-->
      <!--      <input-->
      <!--        type="submit"-->
      <!--        value="ثبت مقاله"-->
      <!--      >-->
      <!--    </p>-->
      <div class="my-10 sm:text-left text-center text-white">
        <button type="button" class="w-64 h-10 p-1 ir-medium  rounded-lg bg-greentype btnSave"  @click="doUpdateArticle">آپدیت مقاله</button>
      </div>

    </form>
  </div>

</template>

<script>
    export default {
        name: "UpdateArticle",
        layout:'admin',
        middleware:'admin',
        async asyncData(ctx) {
          const id = ctx.params.id;
          let article = await ctx.store.dispatch('articlesAdmin/getArticle', id);
          return {
            article
          }
        },
      data() {
            return {
                errors: [],
                base64: null,
                showSessionModal: false,
                image:null,
                editorConfig: {
                    simpleUpload: {
                        uploadUrl: 'https://xlance.ir/api/upload',
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
            }
        },
        components: {
            // 'ckeditor-nuxt': () => import('@blowstack/ckeditor-nuxt')
          'ckeditor-nuxt': () => { if (process.client) { return import('@blowstack/ckeditor-nuxt') } },
        },
        methods:{
            checkForm: function (e) {
                if (this.name && this.age) {
                    return true;
                }

                this.errors = [];

                if (!this.name) {
                    this.errors.push('Name required.');
                }
                if (!this.age) {
                    this.errors.push('Age required.');
                }

                e.preventDefault();
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
            getCategory(){
                this.$store.dispatch('categoryArticleAdmins/getCategories')
            },
            doUpdateArticle() {
                this.$store.dispatch('articlesAdmin/updateArticle', {
                  id: this.article.id,
                  article: {
                    ...this.article,
                    category_id: this.article.category.id,
                    new_image_id: this.image?this.image.id:null,
                    tags: []
                  }
                })
                    .then(res => {
                        this.doUpdate = false;
                        this.$swal('با موفقیت ثبت شد', {
                            icon: 'success'
                        });
                    })
                    .catch(async err => {
                      const keys = Object.keys(err.response.data.errors);
                      for (let i = 0; i < keys.length; i++){
                        for (let j = 0; j < err.response.data.errors[keys[i]].length; j++){
                          await this.$swal(err.response.data.errors[keys[i]][j], {
                            icon: 'error'
                          });
                        }
                      }
                    })
            },

        },
        mounted(){
            this.getCategory()
        },
        computed:{
            category(){
                return this.$store.getters['categoryArticleAdmins/categories']
            }
        }
    }
</script>
