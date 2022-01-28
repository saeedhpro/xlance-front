<template>
  <div class="container">
    <p class="mb-6 text-2xl ir-bold ">ایجاد دسته بندی برای مهارت ها</p>
    <input
      id="name"
      v-model="category.name"
      type="text"
      name="name"
      class="w-full rounded-lg border-2 border-gray-500 border-solid"
    >
    <div>
      <div class="w-20 h-10 items-center text-center">
        <div class="p-2  upload-box-title-box rounded-lg bg-gray-100 text-center  relative"
             @click="onUploadClicked">
          <div class="p-10 text-center border-2 border-dashed border-gray-500 rounded-lg">
            <div class="upload-box-title-text text-gray-700 ir-medium text-sm">
              تصویر آیکن
            </div>
            <div class="my-5 upload-box-title-input">
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
    <div class="my-10 mt-20 sm:text-left text-center text-white">
      <button type="button" class="w-64 h-10 p-1 ir-medium  rounded-lg bg-greentype btnSave"  @click="saveCategory">ثبت دسته بندی</button>
    </div>
    <div class="container">
      <div class="relative bg-white rounded-lg shadow-lg">
        <TableAdmin>
        <div slot="head-name">لیست دسته بندی ها</div>
        <div slot="head1">ردیف</div>
        <div slot="head3">نام دسته بندی ها</div>
        <div slot="head5">عکس دسته بندی ها</div>
        <div slot="head7">عملیات</div>
      </TableAdmin>
      <div v-for="(item, index) in categories" :key="index" class="my-8 px-20 text-center pb-5 flex justify-between border-b-2 border-gray-400 border-dashed">
        <div class="text-black text-sm">{{index + 1}}</div>
        <div class="text-black text-sm">{{item.name}}</div>
        <div class="text-black text-sm">
          <img class="w-20 h-20" v-if="item.thumbnail" :src="item.thumbnail.path">
        </div>
        <div class="text-black text-sm">
          <span @click="deleteCategory(item.id)"><i class="fal fa-trash-alt mr-3"></i></span>
        </div>
      </div>
    </div>
    </div>

    </div>
</template>

<script>

    import TableAdmin from "../../../components/admin/TableAdmin";
    export default {
        name: "AddCategory",
        components: {TableAdmin},
        layout:'admin',
        middleware:'admin',
        data(){
            return{
                base64: null,
                showSessionModal: false,
                courseAdded: false,
                doUpdate:false,
                image:null,
                category:{
                    name:null,
                    parent_id:null,
                    image_id:null,
                }
            }
        },
        methods:{
            saveCategory(){
                this.$store.dispatch('skillsAdmin/addCategory',{
                    ...this.category , image_id:this.image?this.image.id:null
                    }
                )
                    .then(res=>{
                        // this.$router.replace('/admin/SkillsAdmin')
                        this.category.name = null

                    })
                    .catch(err=>{
                    })
            },
            deleteCategory(id){
                this.$swal('آیا مطمئن هستید؟')
                    .then(res => {
                        if(res.value) {
                            this.$store.dispatch('skillsAdmin/deleteCategory', id)
                                .then(res => {
                                    this.$swal('با موفقیت حذف شد!', {
                                        icon: 'success'
                                    });
                                })
                        }
                    })
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
                this.$store.dispatch('skillsAdmin/uploadImage', dataForm)
                    .then((response) => {
                        this.image = response
                    })
                    .catch((error) => {
                    })
            },

        },
        mounted(){
            this.$store.dispatch('skillsAdmin/getSkillCategoried')
        },
        computed:{
            categories(){
                return this.$store.getters['skillsAdmin/getSkillCategoried']
            }
        },

    }
</script>
