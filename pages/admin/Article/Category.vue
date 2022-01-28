<template>
<div class="container">
  <div>
    <label for="name">اضافه کردن دسته بندی</label>
    <input
      id="name"
      type="text"
      name="name"
      v-model="category.name"
      class="w-full rounded-lg border-2 border-gray-500 border-solid"
    >
    <div class="my-10 sm:text-left text-center text-white">
      <button type="button" class="w-64 h-10 p-1 ir-medium  rounded-lg bg-greentype btnSave"  @click="addCategory">افزودن دسته بندی جدید</button>
    </div>
  </div>
  <div>
    <TableAdmin>
      <div slot="head-name">لیست دسته بندی ها</div>
      <div slot="head1">ردیف</div>
      <div slot="head2">نام دسته بندی ها</div>
      <div slot="head7">عملیات</div>
    </TableAdmin>
    <div v-for="(item, index) in categories" :key="index" class="my-8 px-6 pb-5 flex justify-between border-b-2 border-gray-400 border-dashed">
      <div class="text-black text-sm">{{index + 1}}</div>
      <div class="text-black text-sm">{{item.name}}</div>
      <div class="text-black text-sm">
        <span @click="deleteCategory(item.id)"><i class="fal fa-trash-alt mr-3"></i></span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import TableAdmin from "../../../components/admin/TableAdmin";
    export default {
        name: "Category",
        layout:'admin',
        middleware:'admin',
        components:{TableAdmin},
        data(){
            return{
                category:{
                    name:null,
                    parent_id:null,
                    image_id:null
                }
            }
        },
        mounted(){
            this.$store.dispatch('categoryArticleAdmins/getCategories')
        },
        computed:{
            categories(){
                return this.$store.getters['categoryArticleAdmins/categories']
            }
        },
        methods:{
            addCategory(){
                this.$store.dispatch('categoryArticleAdmins/addCategory',
                    this.category
                )
                    .then(res=>{
                        this.category.name = null
                    })
            },
            deleteCategory(id){
                this.$swal('آیا مطمئن هستید؟')
                    .then(res => {
                        if(res.value) {
                            this.$store.dispatch('categoryArticleAdmins/deleteCategory', id)
                                .then(res => {
                                    this.$swal('با موفقیت حذف شد!', {
                                        icon: 'success'
                                    });
                                })
                        }
                    })
            }
        }
    }
</script>
