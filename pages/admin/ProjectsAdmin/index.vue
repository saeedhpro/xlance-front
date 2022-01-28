<template>
  <div class="container">
    <div class="relative bg-white rounded-lg shadow-lg">
      <TableAdmin>
      <div slot="head-name">لیست پروژه ها</div>
      <div slot="head1">ردیف</div>
      <div slot="head2">عنوان پروژه</div>
      <div slot="head3">بازه قیمت</div>
      <div slot="head4">کارفرما</div>
      <div slot="head5">فریلنسر</div>
      <div slot="head6">وضعیت</div>
      <div slot="head7">عملیات</div>
    </TableAdmin>
    <div v-for="(item, index) in projects" :key="index" class="my-8 px-6 pb-5 flex justify-between border-b-2 border-gray-400 border-dashed">
      <div class="text-black text-sm">{{index + 1}}</div>
      <div class="text-black text-sm">{{item.title}}</div>
      <div class="text-black text-sm">از {{item.min_price.toLocaleString() | toPersianNumber}}تا {{ item.max_price.toLocaleString() | toPersianNumber}}</div>
      <div class="text-black text-sm">{{item.employer.username}}</div>
      <div class="text-black text-sm">{{item.freelancer ? item.freelancer.username : 'انتخاب نشده'}}</div>
      <div class="text-black text-sm">{{item.verified ? 'تایید شده' : 'تایید نشده'}}</div>
      <div class="text-black text-sm">
        <button type="button" @click="activeProject(item.id , true)" v-if="!item.verified" class="p-1 px-4 rounded-lg text-white bg-greenFreelancer text-white">تایید پروژه</button>
        <button type="button" @click="activeProject(item.id , false)" class="p-1 mx-2 rounded-lg text-white bg-pink-200 text-white" v-else >غیرفعال کردن</button>
        <nuxt-link :to="`/projects/${item.id}`"  ><i class="fal fa-eye mr-3"></i></nuxt-link>
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
        methods:{
            activeProject(id, accepted){
                this.$store.dispatch('projectsAdmin/activeProject',{id , accepted})
                    .then(res=>{
                        this.$swal(accepted ? 'با موفقیت فعال شد' : 'با موفقیت غیرفعال شد', {
                            icon: 'success'
                        });
                    })
                    .catch(async err => {
                    })
            },
        },
        mounted(){
            this.$store.dispatch('projectsAdmin/getAllProjects')
        },
        computed:{
            projects(){
                return this.$store.getters['projectsAdmin/projects']
            }
        }
    }
</script>
