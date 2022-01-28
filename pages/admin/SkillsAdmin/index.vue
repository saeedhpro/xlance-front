<template>
  <div class="container">
    <div class="relative bg-white rounded-lg shadow-lg">
      <TableAdmin>
        <div slot="head-name">لیست مهارت ها</div>
        <div slot="head1">ردیف</div>
        <div slot="head3">عنوان</div>
        <div slot="head5">دسته بندی</div>
        <div slot="head7">عملیات</div>
      </TableAdmin>
      <div v-for="(item, index) in listSkills" :key="index" class="my-8 px-20 pb-5 flex justify-between border-b-2 border-gray-400 border-dashed">
        <div class="text-black text-sm">{{index + 1}}</div>
        <div class="text-black text-sm">{{item.name}}</div>
        <div class="text-black text-sm">{{item.category.name}}</div>
        <div class="text-black text-sm">
          <span @click="deleteSkill(item.id)"><i class="fal fa-trash-alt mr-3"></i></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import TableAdmin from "../../../components/admin/TableAdmin";
    export default {
        name: "index",
        layout:'admin',
        middleware:'admin',
        components:{TableAdmin},
        mounted(){
            this.$store.dispatch('skillsAdmin/getSkills')
        },
        computed:{
            listSkills(){
                return this.$store.getters['skillsAdmin/skills']
            }
        },
        methods: {
            deleteSkill(id){
                this.$swal('آیا مطمئن هستید؟')
                    .then(res => {
                        if(res.value) {
                            this.$store.dispatch('skillsAdmin/deleteSkill', id)
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
