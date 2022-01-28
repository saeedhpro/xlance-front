<template>
    <div class="container">
      <form
        v-if="!doUpdate"
        id="app"
        action="https://vuejs.org/"
        method="post"
        class="w-full sm:w-80 p-5 rounded-lg border-2 border-gray-500 border-solid"
      >

        <div>
          <label for="name">عنوان </label>
          <input
            id="name"
            v-model="name"
            type="text"
            name="name"
            class="w-full rounded-lg border-2 border-gray-500 border-solid"
          >
        </div>

        <div class="my-5">
          <label for="name">توضیحات </label>
          <textarea
            id="description"
            v-model="description"
            type="text"
            name="name"
            class="w-full rounded-lg border-2 border-gray-500 border-solid"
          >
          </textarea>
        </div>
        <div class="mt-6 mb-6">
          <label for="color">انتخاب رنگ</label>
          <input type="color" v-model="color">
        </div>

        <div class="mt-6 mb-6">
          <label for="color">انتخاب رنگ پس زمینه</label>
          <input type="color" v-model="bg_color">
        </div>


        <div>
          <label for="name">قیمت </label>
          <input
            id="name"
            v-model="price"
            type="text"
            name="name"
            class="w-full rounded-lg border-2 border-gray-500 border-solid"
          >
        </div>
        <div>
          <div class="w-20 h-10 items-center text-center">
            <div class="p-2  upload-box-title-box rounded-lg bg-gray-100 text-center  relative"
                 @click="onUploadClicked">
              <div class="p-10 text-center border-2 border-dashed border-gray-500 rounded-lg">
                <div class="upload-box-title-text text-gray-700 ir-medium text-sm">
                  تصویر آیکن
                </div>
                <div class="my-5 upload-box-title-input">
                  <input ref="upload" accept="image/*" type="file" hidden @change="onFile">
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

        <div class="my-10 sm:text-left text-center text-white">
          <button type="button" class="w-64 h-10 p-1 ir-medium  rounded-lg bg-greentype btnSave"  @click="saveProperty">ثبت مهارت</button>
        </div>
      </form>
      <form
        v-else
        id="app"
        action="https://vuejs.org/"
        method="post"
        class="w-full sm:w-80 p-5 rounded-lg border-2 border-gray-500 border-solid"
      >

        <div>
          <label for="name">عنوان </label>
          <input
            id="name"
            v-model="p.name"
            type="text"
            name="name"
            class="w-full rounded-lg border-2 border-gray-500 border-solid"
          >
        </div>

        <div class="my-5">
          <label for="name">توضیحات </label>
          <textarea
            id="description"
            v-model="p.description"
            type="text"
            name="name"
            class="w-full rounded-lg border-2 border-gray-500 border-solid"
          >
          </textarea>
        </div>
        <div class="mt-6 mb-6">
          <label for="color">انتخاب رنگ</label>
          <input type="color" v-model="p.color">
        </div>

        <div class="mt-6 mb-6">
          <label for="color">انتخاب رنگ پس زمینه</label>
          <input type="color" v-model="p.bg_color">
        </div>


        <div>
          <label for="name">قیمت </label>
          <input
            id="name"
            v-model="p.price"
            type="text"
            name="name"
            class="w-full rounded-lg border-2 border-gray-500 border-solid"
          >
        </div>
        <div>
          <div class="w-20 h-10 items-center text-center">
            <div class="p-2  upload-box-title-box rounded-lg bg-gray-100 text-center  relative"
                 @click="onUploadClicked">
              <div class="p-10 text-center border-2 border-dashed border-gray-500 rounded-lg">
                <div class="upload-box-title-text text-gray-700 ir-medium text-sm">
                  تصویر آیکن
                </div>
                <div class="my-5 upload-box-title-input">
                  <input ref="upload" accept="image/*" type="file" hidden @change="onFile">
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

        <div class="my-10 sm:text-left text-center text-white">
          <div class="my-10 sm:text-left text-center text-white">
            <button type="button" class="w-64 h-10 p-1 ir-medium  rounded-lg bg-greentype btnSave"  @click="doUpdatePackage">ثبت </button>
            <button type="button" class="w-64 h-10 p-1 ir-medium  rounded-lg bg-pink-200 btnSave"  @click="cancelUpdatePackage">لغو </button>
          </div>        </div>
      </form>
      <div class="container">
        <div class="relative bg-white rounded-lg shadow-lg">
          <TableAdmin>
            <div slot="head-name">لیست ویژگی های ایجاد پروژه</div>
            <div slot="head1">ردیف</div>
            <div slot="head2">آیکن</div>
            <div slot="head3">نام</div>
            <div slot="head4">توضیحات</div>
            <div slot="head5">قیمت</div>
            <div slot="head7">عملیات</div>
          </TableAdmin>
          <div v-for="(item, index) in getPropertyCraeteProject" :key="index" class="my-8 px-6 pb-5 flex justify-between border-b-2 border-gray-400 border-dashed justify-around">
            <div class="text-black text-sm">{{index + 1}}</div>
            <div class="text-black text-sm">
              <img class="w-10 h-10 rounded-lg" v-if="item.icon" :src="item.icon.path"/>
            </div>
            <div class="text-black text-sm">{{item.title}}</div>
            <div class="text-black text-sm">{{item.name}}</div>
            <div class="text-black text-sm">{{item.price | toPersianNumber}}</div>
            <div class="text-black text-sm">{{item.description}}</div>
            <div class="text-black text-sm">
               <span @click="updatePackage(item)" style="cursor: pointer">
            <i class="fal fa-edit" ></i>
          </span>
            </div>
          </div>
        </div>
      </div>


    </div>
</template>

<script>
    import TableAdmin from "../../../components/admin/TableAdmin";
    export default {
        name: "index",
        components: {TableAdmin},
        layout:'admin',
        middleware:'admin',
        data () {
            return {
                base64: null,
                showSessionModal: false,
                courseAdded: false,
                doUpdate:false,
                name: null,
                color: null,
                description: null,
                price:null,
                bg_color: null,
                p:{
                    name: null,
                    color: null,
                    description: null,
                    price:null,
                    bg_color: null,

                }
            }
        },
        methods:{
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
            async saveProperty(){
                await this.$store.dispatch('propertyAdmin/addPropertyCraeteProject',{
                    icon_id:this.image ? this.image.id :null,
                    name : this.name,
                    description :this.description,
                    color:this.color,
                    bg_color:this.bg_color,
                    price:this.price

                })
                    .then(res=>{
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
            updatePackage(p) {
                this.doUpdate = true;
                this.p = {...p};
            },
            doUpdatePackage() {
              const p = {
                ...this.p ,
                icon_id:this.image ? this.image.id :null,
              }
                this.$store.dispatch('propertyAdmin/updatePac',p)

                    .then(res => {
                        this.doUpdate = false;

                        this.p = {
                            id: null,
                            title: null,
                            number:null,
                            price:null,
                        };
                        this.$swal('با موفقیت ثبت شد', {
                            icon: 'success'
                        });
                    })
                    .catch(err => {
                    })
            },
            cancelUpdatePackage() {
                this.doUpdate = false;
                this.p = {
                    id: null,
                    name: null,
                    color: null,
                    description: null,
                    price:null,
                    bg_color: null,
                };
            }
        },
        computed:{
            getPropertyCraeteProject(){
                return this.$store.getters['propertyAdmin/getPropertyCraeteProject']
            }
        },
        mounted() {
            this.$store.dispatch('propertyAdmin/getPropertyCraeteProject')
        }
    }
</script>
